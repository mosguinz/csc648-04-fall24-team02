"""Create tables for resources

Revision ID: fd32f4c6a8b2
Revises: 1a31ce608336
Create Date: 2024-10-20 09:18:43.544565

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'fd32f4c6a8b2'
down_revision = '1a31ce608336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('facilitytype',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('icon_image_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_facilitytype_name'), 'facilitytype', ['name'], unique=True)
    op.create_table('recipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('time_to_complete', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_recipe_name'), 'recipe', ['name'], unique=True)
    op.create_table('resourcetype',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('icon_image_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_resourcetype_name'), 'resourcetype', ['name'], unique=True)
    op.create_table('recipeinput',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('resource_type_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.ForeignKeyConstraint(['resource_type_id'], ['resourcetype.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipeoutput',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('resource_type_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.ForeignKeyConstraint(['resource_type_id'], ['resourcetype.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userfacility',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Uuid(), nullable=False),
    sa.Column('item_type_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_type_id'], ['facilitytype.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userresource',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Uuid(), nullable=False),
    sa.Column('resource_type_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['resource_type_id'], ['resourcetype.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userresource')
    op.drop_table('userfacility')
    op.drop_table('recipeoutput')
    op.drop_table('recipeinput')
    op.drop_index(op.f('ix_resourcetype_name'), table_name='resourcetype')
    op.drop_table('resourcetype')
    op.drop_index(op.f('ix_recipe_name'), table_name='recipe')
    op.drop_table('recipe')
    op.drop_index(op.f('ix_facilitytype_name'), table_name='facilitytype')
    op.drop_table('facilitytype')
    # ### end Alembic commands ###