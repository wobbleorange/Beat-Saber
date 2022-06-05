bl_info = {
    "name": "Export cube data to JSON",
    "author": "wobbleorange",
    "version": "0.03",
    "blender": (2, 80, 0),
    "location": "View3d > Sidepanel",
    "description": "Exports cube loc, rot, & scl data, offset per environment"}


import bpy, os, json
from math import degrees, radians, pi
from mathutils import Matrix, Vector

from bpy.props import (StringProperty,
                       IntProperty,
                       PointerProperty,
                       EnumProperty,
                       BoolProperty,
                       )
                       
from bpy.types import (Panel,
                       PropertyGroup,
                       Operator,
                       )


# ------------------------------------------------------------------------
#    Scene Properties
# ------------------------------------------------------------------------

class MyProperties(PropertyGroup):

    track: StringProperty(
        name="Track",
        description="-",
        default="",
        maxlen=24,
        )

    beat: IntProperty(
        name="Beat",
        description="-",
        default = 0,
        min = 0,
        max = 1000
        )

    dur: IntProperty(
        name="Duration",
        description="-",
        default = 0,
        min = 0,
        max = 1000
        )

    f_begin: IntProperty(
        name="Begin Frame",
        description="-",
        default = 1,
        min = 1,
        max = 1000
        )

    f_end: IntProperty(
        name="End Frame",
        description="-",
        default = 1,
        min = 1,
        max = 1000
        )

    keysOnly: BoolProperty(
        name="Keyframes only",
        description="Export keyframes only. Note, this will require keyframes at the Being and End frames.",
        default = False
        )

    selectOnly: BoolProperty(
        name="Selection only",
        description="Export selected cubes only.",
        default = True
        )

    opEnv: EnumProperty(
        items=[("walls", "Walls", "Export for Obstacles"),("bts", "BTS", "Export for BTS Environment"),("billie", "Billie", "Export for Billie Environment"),("gaga", "Gaga", "Export for Gaga Environment")],
        name="Output",
        description=":",
        default=None,
        )


# ------------------------------------------------------------------------
#    Operators  --  Script goes here
# ------------------------------------------------------------------------

class WM_OT_Blend2JSON(Operator):
    bl_label = "Export"
    bl_idname = "wm.blend2json"
    bl_description = "Export to JSON"

    def execute(self, context):
        scene = context.scene
        mytool = scene.my_tool
        
        if mytool.opEnv == "gaga":
            Voffset = (0, 1, 1)
            Xdelta = 0
        if mytool.opEnv == "bts":
            Voffset = (0, 0, 1)
            Xdelta = 0
            #Ydelta = 1.1
            #Zdelta = 0.16
        if mytool.opEnv == "billie":
            Voffset = (0, -1, 0)
            Xdelta = 0
        if mytool.opEnv == "walls":
            Voffset = (0, -1, -1)
            Xdelta = 1

        # print the values to the console
        print("Exporting to JSON")
        if mytool.track != "":
            print("track:", mytool.track)        
        print("time:", mytool.beat)
        print("output:", mytool.opEnv)
        print("offset:", Voffset)
        print("X:", Xdelta)


        # get the current selection
        selection = bpy.context.selected_objects

        # get path of the blend file (file should have been saved at least once)
        tempFolder = bpy.path.abspath("//")


        # make a filename
        filename = os.path.join (tempFolder, "cube.Locations.json")
        # open a file to write to
        file = open(filename, "w")   # a is for appending  w writes new

        # initialize
        #result = "{\n"
        result = "["

        defPosJson = ""
        locRotJson = ""
        scalJson = ""

        bpy.context.object.rotation_mode = 'YXZ'

        if mytool.selectOnly == False:
            bpy.ops.object.select_all(action='SELECT')

        # loop through selected objects
        for sel in selection:
            defPos = "\"_definitePosition\":["
            locRot = "\"_localRotation\":["
            scal = "\"_scale\":["
            
            if mytool.track != "":
              cube = "{\"_time\":" + str(mytool.beat) + ",\"_lineIndex\":0,\"_type\":0,\"_duration\":" + str(mytool.dur) + ",\"_width\":0,\"_customData\":{\"_track\":\"" + mytool.track + "\",\"_animation\":{"
            else:
              cube = "{\"_time\":" + str(mytool.beat) + ",\"_lineIndex\":0,\"_type\":0,\"_duration\":" + str(mytool.dur) + ",\"_width\":0,\"_customData\":{\"_animation\":{"

            #get keyframe dat, if required.
            if mytool.keysOnly == True:
                frames = [mytool.f_begin,mytool.f_end]
                for fc in sel.animation_data.action.fcurves :
                    #if fc.data_path.endswith(('location','rotation_euler','rotation_quaternion','scale')):
                    if fc.data_path.endswith(('location')):
                        for key in fc.keyframe_points :
                            #print('frame:',key.co[0],'value:',key.co[1])
                            frames += [key.co[0]]

                kfs = int(len(frames)/3) #divide for xyz
                #print(kfs)            


            for frame in range(mytool.f_begin, mytool.f_end+1):
#keyframes only
                if mytool.keysOnly == True:
                    if frame in frames:
                        bpy.context.scene.frame_set(frame)
                        # set BS pivot point for walls
                        mw = sel.matrix_world
                        offset = Vector(Voffset)
                        sel.data.transform(Matrix.Translation( -offset ))
                        sel.matrix_world.translation = mw @ offset
                        # get the data
                        loc = sel.location
                        rot = sel.rotation_euler
                        scl = sel.scale
                        if mytool.f_end == 1:
                            tt = 0
                        else:
                            tt = (frame-mytool.f_begin) / (mytool.f_end-mytool.f_begin)
                        defPosJson = round(loc.x+Xdelta,6),round(loc.z,6),round(loc.y,6),round(tt,2)
                        defPos+= json.dumps(defPosJson) + ','
                        locRotJson = round(degrees(-rot.x),6),round(degrees(-rot.z),6),round(degrees(-rot.y),6),round(tt,2)
                        locRot+= json.dumps(locRotJson) + ','
                        scalJson = round(scl.x,6),round(scl.z,6),round(scl.y,6),round(tt,2)
                        scal+= json.dumps(scalJson) + ','
                        # reset pivot
                        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')
#all frames
                else:
                    bpy.context.scene.frame_set(frame)
                    # set BS pivot point for walls
                    mw = sel.matrix_world
                    offset = Vector(Voffset)
                    sel.data.transform(Matrix.Translation( -offset ))
                    sel.matrix_world.translation = mw @ offset
                    # get the data
                    loc = sel.location
                    rot = sel.rotation_euler
                    scl = sel.scale
                    if mytool.f_end == 1:
                        tt = 0
                    else:
                        tt = (frame-mytool.f_begin) / (mytool.f_end-mytool.f_begin)
                    defPosJson = round(loc.x+Xdelta,6),round(loc.z,6),round(loc.y,6),round(tt,2)
                    defPos+= json.dumps(defPosJson) + ','
                    locRotJson = round(degrees(-rot.x),6),round(degrees(-rot.z),6),round(degrees(-rot.y),6),round(tt,2)
                    locRot+= json.dumps(locRotJson) + ','
                    scalJson = round(scl.x,6),round(scl.z,6),round(scl.y,6),round(tt,2)
                    scal+= json.dumps(scalJson) + ','
                    # reset pivot
                    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='MEDIAN')



 
            defPos = defPos[:-1] +']'
            #print(defPos)
            locRot = locRot[:-1] +']'
            scal = scal[:-1] +']'
            

            # store it in json
            # resultJson = {defPos, locRot, scal}
            # turns a single jsonline in a string and adds ',' for next object
            cube+= defPos + ',' + locRot + ',' + scal + '},"_scale":[2,2,2],"_color":[0,1,0,1]}},\n'
            result+= cube


        result = result[:-2] + "]" # remove last comma from joined string objects
        #result = result +'\n}'
        file.write(result)
        file.close()


        print("Export completed")


        #if selectOnly == false:
        #    bpy.ops.object.select_all(action='DESELECT')





        return {'FINISHED'}

# ------------------------------------------------------------------------
#    Panel in Object Mode
# ------------------------------------------------------------------------

class OBJECT_PT_CustomPanel(Panel):
    bl_label = "JSON export"
    bl_idname = "OBJECT_PT_custom_panel"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "JSON Export Tool"
    bl_context = "objectmode"   

    @classmethod
    def poll(self,context):
        return context.object is not None

    def draw(self, context):
        layout = self.layout
        scene = context.scene
        mytool = scene.my_tool

        layout.prop(mytool, "track")
        layout.prop(mytool, "beat")
        layout.prop(mytool, "dur")
        layout.prop(mytool, "f_begin")
        layout.prop(mytool, "f_end")
        layout.prop(mytool, "keysOnly")
        layout.prop(mytool, "selectOnly")
        layout.separator()
        layout.prop(mytool, "opEnv")
        layout.operator("wm.blend2json")


# ------------------------------------------------------------------------
#    Registration
# ------------------------------------------------------------------------

classes = (
    MyProperties,
    WM_OT_Blend2JSON,
    OBJECT_PT_CustomPanel
)

def register():
    from bpy.utils import register_class
    for cls in classes:
        register_class(cls)

    bpy.types.Scene.my_tool = PointerProperty(type=MyProperties)

def unregister():
    from bpy.utils import unregister_class
    for cls in reversed(classes):
        unregister_class(cls)
    del bpy.types.Scene.my_tool


if __name__ == "__main__":
    register()