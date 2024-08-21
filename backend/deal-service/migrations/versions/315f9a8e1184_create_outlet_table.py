"""Create outlet table

Revision ID: 315f9a8e1184
Revises: 48dfd9cd917d
Create Date: 2024-08-21 23:42:11.364252

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '315f9a8e1184'
down_revision: Union[str, None] = '48dfd9cd917d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('outlet',
    sa.Column('outlet_id', sa.Integer(), nullable=False),
    sa.Column('outlet_name', sa.String(), nullable=False),
    sa.Column('longitude', sa.String(), nullable=False),
    sa.Column('latitude', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('building_name', sa.String(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('created_on', sa.DateTime(), nullable=True),
    sa.Column('updated_on', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.restaurant_id'], ),
    sa.PrimaryKeyConstraint('outlet_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('outlet')
    # ### end Alembic commands ###
