"""message

Revision ID: 26f5576a108a
Revises: 2340fec71eb9
Create Date: 2024-07-09 22:33:01.610040

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '26f5576a108a'
down_revision = '2340fec71eb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Auctions', sa.Column('img', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Auctions', 'img')
    # ### end Alembic commands ###
