"""Update cascade delete relationship

Revision ID: 2c7d960c3de4
Revises: fd32f4c6a8b2
Create Date: 2024-10-20 22:26:54.797852

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '2c7d960c3de4'
down_revision = 'fd32f4c6a8b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('recipeinput_resource_type_id_fkey', 'recipeinput', type_='foreignkey')
    op.drop_constraint('recipeinput_recipe_id_fkey', 'recipeinput', type_='foreignkey')
    op.create_foreign_key(None, 'recipeinput', 'recipe', ['recipe_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'recipeinput', 'resourcetype', ['resource_type_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('recipeoutput_recipe_id_fkey', 'recipeoutput', type_='foreignkey')
    op.drop_constraint('recipeoutput_resource_type_id_fkey', 'recipeoutput', type_='foreignkey')
    op.create_foreign_key(None, 'recipeoutput', 'resourcetype', ['resource_type_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'recipeoutput', 'recipe', ['recipe_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('userfacility_user_id_fkey', 'userfacility', type_='foreignkey')
    op.drop_constraint('userfacility_item_type_id_fkey', 'userfacility', type_='foreignkey')
    op.create_foreign_key(None, 'userfacility', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'userfacility', 'facilitytype', ['item_type_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('userresource_user_id_fkey', 'userresource', type_='foreignkey')
    op.drop_constraint('userresource_resource_type_id_fkey', 'userresource', type_='foreignkey')
    op.create_foreign_key(None, 'userresource', 'resourcetype', ['resource_type_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'userresource', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'userresource', type_='foreignkey')
    op.drop_constraint(None, 'userresource', type_='foreignkey')
    op.create_foreign_key('userresource_resource_type_id_fkey', 'userresource', 'resourcetype', ['resource_type_id'], ['id'])
    op.create_foreign_key('userresource_user_id_fkey', 'userresource', 'user', ['user_id'], ['id'])
    op.drop_constraint(None, 'userfacility', type_='foreignkey')
    op.drop_constraint(None, 'userfacility', type_='foreignkey')
    op.create_foreign_key('userfacility_item_type_id_fkey', 'userfacility', 'facilitytype', ['item_type_id'], ['id'])
    op.create_foreign_key('userfacility_user_id_fkey', 'userfacility', 'user', ['user_id'], ['id'])
    op.drop_constraint(None, 'recipeoutput', type_='foreignkey')
    op.drop_constraint(None, 'recipeoutput', type_='foreignkey')
    op.create_foreign_key('recipeoutput_resource_type_id_fkey', 'recipeoutput', 'resourcetype', ['resource_type_id'], ['id'])
    op.create_foreign_key('recipeoutput_recipe_id_fkey', 'recipeoutput', 'recipe', ['recipe_id'], ['id'])
    op.drop_constraint(None, 'recipeinput', type_='foreignkey')
    op.drop_constraint(None, 'recipeinput', type_='foreignkey')
    op.create_foreign_key('recipeinput_recipe_id_fkey', 'recipeinput', 'recipe', ['recipe_id'], ['id'])
    op.create_foreign_key('recipeinput_resource_type_id_fkey', 'recipeinput', 'resourcetype', ['resource_type_id'], ['id'])
    # ### end Alembic commands ###
