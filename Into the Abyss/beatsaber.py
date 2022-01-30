bl_info = {
	"name": "Set pivot origin for Beat Saber",
	"author": "wobbleorange",
	"version": "",
	"blender": (2, 80, 0),
	"location": "View3d > Object",
	"description": "Sets all object origins to the bottom center aft edge",
	"wiki_url": "",
	"tracker_url": "",
	"category": "Object"}

import bpy
from mathutils import Matrix
from mathutils import Vector
from bpy.types import Operator


class OBJECT_OT_set_pivot_BeatSaber(bpy.types.Operator):
	
	bl_label = "Set object pivot for Beat Saber"
	bl_idname = "object.set_pivot"
	bl_description = "Sets all object origins to the bottom center aft edge"
	bl_space_type = "VIEW_3D"
	bl_region_type = "UI"
	bl_options = {'REGISTER', 'UNDO'}


	def execute(self, context):
		for ob in bpy.data.objects:
			if ob.type == 'MESH':
				mw = ob.matrix_world
				imw = mw.inverted()
				me = ob.data
				offset = Vector((0, -1, -1)) 
				me.transform(Matrix.Translation( -offset ))
				ob.matrix_world.translation = mw @ offset
		return {'FINISHED'}


def circulate_button(self, context):
	self.layout.operator(
        OBJECT_OT_set_pivot_BeatSaber.bl_idname,
        text="Set BS object pivot",
        icon='PHYSICS')

def register():
	bpy.utils.register_class(OBJECT_OT_set_pivot_BeatSaber)
	bpy.types.VIEW3D_MT_object.append(circulate_button)


def unregister():
	bpy.utils.unregister_class(OBJECT_OT_set_pivot_BeatSaber)
	bpy.types.VIEW3D_MT_object.remove(circulate_button)


if __name__ == "__main__":
	register()
