"""message

Revision ID: 49ac8d3cc5da
Revises: 2f0a1f6cec8d
Create Date: 2024-07-19 18:52:39.238884

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49ac8d3cc5da'
down_revision = '2f0a1f6cec8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Categories_id'), 'Categories', ['id'], unique=False)
    op.create_table('Locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longtitude', sa.Float(), nullable=False),
    sa.Column('Address', sa.String(), nullable=False),
    sa.Column('Country', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Locations_id'), 'Locations', ['id'], unique=False)
    op.create_table('Users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('surname', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('afm', sa.String(), nullable=False),
    sa.Column('validated', sa.Boolean(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('seller_rating', sa.Float(), nullable=True),
    sa.Column('bidder_rating', sa.Float(), nullable=True),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('img', sa.String(), nullable=False),
    sa.Column('work_exp', sa.String(), nullable=False),
    sa.Column('work_exp_visible', sa.Boolean(), nullable=False),
    sa.Column('education', sa.String(), nullable=False),
    sa.Column('education_visible', sa.Boolean(), nullable=False),
    sa.Column('expertise', sa.String(), nullable=False),
    sa.Column('expertise_visible', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_Users_id'), 'Users', ['id'], unique=False)
    op.create_table('Ads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('img', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Ads_id'), 'Ads', ['id'], unique=False)
    op.create_table('Messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.Column('read', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['receiver_id'], ['Users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Messages_id'), 'Messages', ['id'], unique=False)
    op.create_table('Posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('img', sa.String(), nullable=True),
    sa.Column('audio', sa.String(), nullable=True),
    sa.Column('video', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Posts_id'), 'Posts', ['id'], unique=False)
    op.create_table('TokenSessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_TokenSessions_id'), 'TokenSessions', ['id'], unique=False)
    op.create_index(op.f('ix_TokenSessions_token'), 'TokenSessions', ['token'], unique=True)
    op.create_table('friend_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requester_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['receiver_id'], ['Users.id'], ),
    sa.ForeignKeyConstraint(['requester_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_friend_requests_id'), 'friend_requests', ['id'], unique=False)
    op.create_table('Bids',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('bidder_id', sa.Integer(), nullable=False),
    sa.Column('time', sa.DateTime(timezone=True), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['bidder_id'], ['Users.id'], ),
    sa.ForeignKeyConstraint(['post_id'], ['Posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Bids_id'), 'Bids', ['id'], unique=False)
    op.create_table('Photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('URL', sa.String(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['Posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_Photos_id'), 'Photos', ['id'], unique=False)
    op.create_table('auction_category',
    sa.Column('Post_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['Post_id'], ['Posts.id'], ),
    sa.ForeignKeyConstraint(['category_id'], ['Categories.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('auction_category')
    op.drop_index(op.f('ix_Photos_id'), table_name='Photos')
    op.drop_table('Photos')
    op.drop_index(op.f('ix_Bids_id'), table_name='Bids')
    op.drop_table('Bids')
    op.drop_index(op.f('ix_friend_requests_id'), table_name='friend_requests')
    op.drop_table('friend_requests')
    op.drop_index(op.f('ix_TokenSessions_token'), table_name='TokenSessions')
    op.drop_index(op.f('ix_TokenSessions_id'), table_name='TokenSessions')
    op.drop_table('TokenSessions')
    op.drop_index(op.f('ix_Posts_id'), table_name='Posts')
    op.drop_table('Posts')
    op.drop_index(op.f('ix_Messages_id'), table_name='Messages')
    op.drop_table('Messages')
    op.drop_index(op.f('ix_Ads_id'), table_name='Ads')
    op.drop_table('Ads')
    op.drop_index(op.f('ix_Users_id'), table_name='Users')
    op.drop_table('Users')
    op.drop_index(op.f('ix_Locations_id'), table_name='Locations')
    op.drop_table('Locations')
    op.drop_index(op.f('ix_Categories_id'), table_name='Categories')
    op.drop_table('Categories')
    # ### end Alembic commands ###
