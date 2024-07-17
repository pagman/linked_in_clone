"""message

Revision ID: 1c4c70e92a48
Revises: c6d74806d3b0
Create Date: 2024-07-17 20:46:38.528279

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c4c70e92a48'
down_revision = 'c6d74806d3b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Users', sa.Column('work_exp', sa.String(), nullable=False))
    op.add_column('Users', sa.Column('work_exp_visible', sa.Boolean(), nullable=False))
    op.add_column('Users', sa.Column('education', sa.String(), nullable=False))
    op.add_column('Users', sa.Column('education_visible', sa.Boolean(), nullable=False))
    op.add_column('Users', sa.Column('expertise', sa.String(), nullable=False))
    op.add_column('Users', sa.Column('expertise_visible', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Users', 'expertise_visible')
    op.drop_column('Users', 'expertise')
    op.drop_column('Users', 'education_visible')
    op.drop_column('Users', 'education')
    op.drop_column('Users', 'work_exp_visible')
    op.drop_column('Users', 'work_exp')
    # ### end Alembic commands ###
