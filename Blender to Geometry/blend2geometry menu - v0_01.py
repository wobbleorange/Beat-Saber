bl_info = {
    "name": "Export cube data to geometry",
    "author": "wobbleorange",
    "version": "0.01",
    "blender": (2, 80, 0),
    "location": "View3d > Sidepanel",
    "description": "Exports cube loc, rot, & scl data, for geometry environment"}


import bpy, os, sys, json, copy
from pathlib import Path
from math import degrees, radians, pi
from mathutils import Matrix, Vector, Euler

from bpy.props import (StringProperty,
                       IntProperty,
                       FloatProperty,
                       PointerProperty,
                       EnumProperty,
                       BoolProperty,
                       )
                       
from bpy.types import (Panel,
                       PropertyGroup,
                       Operator,
                       )

# ------------------------------------------------------------------------

def ShowMessageBox(message = "", title = "Message Box", icon = 'INFO'):

    def draw(self, context):
        self.layout.label(text=message)

    bpy.context.window_manager.popup_menu(draw, title = title, icon = icon)


def reduceDupli(myArray):
            xtime = 1
            xlong = len(myArray) - 1
            while xtime < xlong :
                if myArray[xtime][0] == myArray[xtime-1][0] and \
                    myArray[xtime][1] == myArray[xtime-1][1] and \
                    myArray[xtime][2] == myArray[xtime-1][2] and \
                    myArray[xtime][0] == myArray[xtime+1][0] and \
                    myArray[xtime][1] == myArray[xtime+1][1] and \
                    myArray[xtime][2] == myArray[xtime+1][2] :
                    
                    myArray.pop(xtime)
                    xlong-=1
                else:
                    xtime+=1

# ------------------------------------------------------------------------
#    Scene Properties
# ------------------------------------------------------------------------

class MyGeoProperties(PropertyGroup):


    beat: IntProperty(
        name="Beat",
        #description="-",
        default = 0,
        min = 0,
        max = 1000
        )

    dur: FloatProperty(
        name="Duration",
        #description="-",
        default = 0,
        min = 0,
        max = 1000,
        step = 25,
        precision = 3
        )

    repeat: BoolProperty(
        name="Repeat",
        description="Repeat Animation",
        default = False
        )

    addTime: FloatProperty(
        name="Add Time",
        #description="-",
        default = 1,
        min = 0.001,
        max = 1000,
        step = 25,
        precision = 3
        )

    repAmount: IntProperty(
        name="Times",
        #description="-",
        default = 1,
        min = 1,
        max = 1000
        )

    f_start: IntProperty(
        name="Start Frame",
        #description="-",
        default = 1,
        min = 1,
        max = 1000
        )

    f_end: IntProperty(
        name="End Frame",
        #description="-",
        default = 1,
        min = 1,
        max = 1000
        )

    fadeIn: BoolProperty(
        name="Fade In",
        description="Objects disappear before animation. \n (End frame must be greater than Start)",
        default = False
        )

    fadeOut: BoolProperty(
        name="Fade Out",
        description="Objects disappear after animation. \n (End frame must be greater than Start)",
        default = False
        )

    keysOnly: BoolProperty(
        name="Keyframes only",
        description="Export keyframes only",
        default = False
        )

    selectOnly: BoolProperty(
        name="Selection only",
        description="Export selected cubes only",
        default = True
        )

    opEnv: EnumProperty(
        items=[("geo", "Geometry", "Export for Geometry")],
        name="Output",
        description=":",
        default = "geo",
        )


# ------------------------------------------------------------------------
#    Operators  --  Script goes here
# ------------------------------------------------------------------------

class WM_OT_blend2geometry(Operator):
    bl_label = "Export"
    bl_idname = "wm.blend2geometry"
    bl_description = "Export to Geometry"

    def execute(self, context):

        scene = context.scene
        mytool = scene.myGeoTool

        #scaleAnimExist = False
        #colorAnimExist = False
        #bpy.context.scene.frame_set(mytool.f_start)


        # print the values to the console
        print("Exporting to JSON ...")
        #if mytool.track != "":
        #    print("track:", mytool.track)        

        #print(str(Path.home()))

        # get path of the blend file (file should have been saved at least once)
        tempFolder = bpy.path.abspath("//")
        # make a filename
        filename = os.path.join (tempFolder, "geometry.json")
        # open a file to write to
        file = open(filename, "w")   # a is for appending  w writes new


        cuubs = 0
        allCuub = []
        allEvents = []

        #cheap error check
        if mytool.f_start > mytool.f_end:
            mytool.f_start = mytool.f_end
            ShowMessageBox("Start frame higher than End frame", "Oops", 'MONKEY')
            return {'FINISHED'}

        if mytool.f_start < mytool.f_end:
            if mytool.repeat == True:
                if mytool.addTime < mytool.dur:
                    ShowMessageBox("Add Time less than Duration \n (repeat will overlap)", "Oops", 'MONKEY')
                    return {'FINISHED'}


        if mytool.selectOnly == False:
            bpy.ops.object.select_all(action='SELECT')

        selection = bpy.context.selected_objects

        # loop through selected objects
        for sel in selection:
            cuubs += 1 # track counter
            cuub = {}
            event = {}

            AnimLocRot = []
            AnimLocPos = []
            AnimScal = []

            
            #get geo type, else default to BTS pillar
            if len(sel.data.materials) > 1:
                obType = sel.material_slots[1].name
            else:
                obType = "Cube"

            if len(sel.data.materials) > 2:
                shader = sel.material_slots[2].name
            else:
                shader = "BTSPillar"


            if len(sel.data.materials) > 4:
                lightType = int(sel.material_slots[4].name)
            else:
                lightType = 1

            if len(sel.data.materials) > 5:
                lightID = int(sel.material_slots[5].name)
            else:
                lightID = 100


            rot = sel.rotation_euler
            locRot = [round(degrees(-rot.x),4),round(degrees(-rot.z),4),round(degrees(-rot.y),4)]
            locPos = [round(sel.location[0],4),round(sel.location[2],4),round(sel.location[1],4)]
            scal = [round(sel.scale[0]*2,4),round(sel.scale[2]*2,4),round(sel.scale[1]*2,4)]

            cuub['geometry'] = {'type':obType, 'material':{'shader':shader}}

            if shader == "Standard":
                dcolor = sel.data.materials[0].diffuse_color
                viewcolor = round(dcolor[0],4), round(dcolor[1],4), round(dcolor[2],4)
                cuub['geometry']['material']['color'] = viewcolor

            if shader == "OpaqueLight" or shader == "TransparentLight":
                cuub['components'] = {'TubeBloomPrePassLight':{'colorAlphaMultiplier':1},'ILightWithId':{'type':lightType,'lightID':lightID}}

            if mytool.fadeIn == True and mytool.f_end > mytool.f_start:
                cuub['position'] = [0,-20000,0]
            else:
                cuub['position'] = locPos
            cuub['rotation'] = locRot
            cuub['scale'] = scal

            if len(sel.data.materials) > 3:
                track = sel.material_slots[3].name
            else:
                track = "track"
            
            #if animated, add counter to track
            if mytool.f_end > mytool.f_start:
                cuub['track'] = track + str(cuubs)
            else:
                cuub['track'] = track

            allCuub.append(cuub)



            #== if anim ===================================================================================================
            if mytool.f_end > mytool.f_start:# or mytool.fadeIn == True or mytool.fadeOut == True:
                frames = [mytool.f_start,mytool.f_end]
                #animation data check
                if (sel.animation_data is not None) and (sel.animation_data.action is not None):
                    objAnimExist = True
                    print("has animation")
                    for fc in sel.animation_data.action.fcurves :
                        if fc.data_path.endswith(('scale')):
                            scaleAnimExist = True
                else:
                    objAnimExist = False
                    print("no loc/rot/scl key frames")
                
                #get keyframe data, if keysOnly.
                if mytool.keysOnly == True:
                    if objAnimExist == True:
                        for fc in sel.animation_data.action.fcurves :
                            if fc.data_path.endswith(('location','rotation_euler','scale')):
                                for key in fc.keyframe_points :
                                    if key.co[0] not in frames:
                                        frames += [key.co[0]]

                for frame in range(mytool.f_start, mytool.f_end+1):
                    #keyframes only
                    if mytool.keysOnly == True:
                        if frame in frames:
                            bpy.context.scene.frame_set(frame)
                            
                            if mytool.f_end == mytool.f_start:
                                tt = 0
                            else:
                                tt = round((frame-mytool.f_start) / (mytool.f_end-mytool.f_start), 4)
                                
                            AnimLocRot += [[round(degrees(-rot.x),4),round(degrees(-rot.z),4),round(degrees(-rot.y),4),tt]]
                            AnimLocPos += [[round(sel.location[0],4),round(sel.location[2],4),round(sel.location[1],4),tt]]
                            AnimScal += [[round(sel.scale[0]*2,4),round(sel.scale[2]*2,4),round(sel.scale[1]*2,4),tt]]

                    #all frames
                    else:
                        bpy.context.scene.frame_set(frame)

                        if mytool.f_end == mytool.f_start:
                            tt = 0
                        else:
                            tt = round((frame-mytool.f_start) / (mytool.f_end-mytool.f_start), 4)
                            
                        AnimLocRot += [[round(degrees(-rot.x),4),round(degrees(-rot.z),4),round(degrees(-rot.y),4),tt]]
                        AnimLocPos += [[round(sel.location[0],4),round(sel.location[2],4),round(sel.location[1],4),tt]]
                        AnimScal += [[round(sel.scale[0]*2,4),round(sel.scale[2]*2,4),round(sel.scale[1]*2,4),tt]]


                if mytool.fadeIn == True:
                    AnimLocPos[0][3] = 0.005
                    AnimLocPos.insert(0, [0, -20000, 0, 0])
                    AnimScal[0][3] = 0.01
                    AnimScal.insert(0, [0, 0, 0, 0])

                if mytool.fadeOut == True:
                    last = len(AnimLocPos) - 1
                    AnimLocPos[last][3] = 0.995
                    AnimLocPos.append([0, -20000, 0, 1])
                    AnimScal[last][3] = 0.99
                    AnimScal.append([0, 0, 0, 1])

                # remove redundant data
                reduceDupli(AnimLocPos)
                reduceDupli(AnimLocRot)
                reduceDupli(AnimScal)
                
                event['b'] = mytool.beat
                event['t'] = "AnimateTrack"
                event['d'] = {'track':track + str(cuubs), 'duration':mytool.dur, 'position':AnimLocPos}
                # ? bother with if rot or scale exist ?...
                event['d'].update({'rotation':AnimLocRot})
                event['d'].update({'scale':AnimScal})

                allEvents.append(event)

                # repeats ==========
                if mytool.repeat == True:
                    for rep in range(1, mytool.repAmount+1):
                        addEvent = event.copy()
                        addEvent['b'] = round(mytool.beat + rep*mytool.addTime, 4)
                        allEvents.append(addEvent)


            print("json dumps cuub ==============")
            print(json.dumps(cuub))


        sortedEvents = sorted(allEvents, key=lambda d: d['b'])
        outputCuub = json.dumps(allCuub, separators=(',' ':'))
        if mytool.f_start < mytool.f_end:
            outputCuub += json.dumps(sortedEvents, separators=(',' ':'))

        formatOutput = outputCuub.replace('},{', '},\n{').replace('}][{', '}]\n[{').replace('.0,', ',').replace('.0]', ']').replace('-0', '0')
        file.write(formatOutput)
        file.close()

        print("Export completed")
        ShowMessageBox("Export completed", "JSON Export", 'EXPORT')


        return {'FINISHED'}

# ------------------------------------------------------------------------
#    Panel in Object Mode
# ------------------------------------------------------------------------

class OBJECT_PT_GeoCustomPanel(Panel):
    bl_label = "Geometry export"
    bl_idname = "OBJECT_PT_GeoCustomPanel"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Geometry Export Tool"
    bl_context = "objectmode"   

    @classmethod
    def poll(self,context):
        return context.object is not None

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        mytool = scene.myGeoTool

        layout.prop(mytool, "beat")
        layout.prop(mytool, "dur")
        layout.prop(mytool, "repeat")
        if mytool.repeat == True:
            layout.prop(mytool, "addTime")
            layout.prop(mytool, "repAmount")
        else:
            box = layout.box()
            box.separator(factor=1.8)
            box2 = layout.box()
            box2.separator(factor=1.8)
        layout.separator(factor=0.2)
        layout.prop(mytool, "f_start")
        layout.prop(mytool, "f_end")
        layout.separator(factor=0.2)
        #if mytool.f_end > mytool.f_start:
        #   box = layout.box()
        row = layout.row()
        row.prop(mytool, "fadeIn")
        row.prop(mytool, "fadeOut")
        layout.prop(mytool, "keysOnly")
        layout.prop(mytool, "selectOnly")
        layout.separator(factor=0.2)
        layout.prop(mytool, "opEnv")
        layout.operator("wm.blend2geometry")



# ------------------------------------------------------------------------
#    Registration
# ------------------------------------------------------------------------

classes = (
    MyGeoProperties,
    WM_OT_blend2geometry,
    OBJECT_PT_GeoCustomPanel
)

def register():
    from bpy.utils import register_class
    for cls in classes:
        register_class(cls)

    bpy.types.Scene.myGeoTool = PointerProperty(type=MyGeoProperties)

def unregister():
    from bpy.utils import unregister_class
    for cls in reversed(classes):
        unregister_class(cls)
    del bpy.types.Scene.myGeoTool


if __name__ == "__main__":
    register()