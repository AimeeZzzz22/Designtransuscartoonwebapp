"""add chat mode to wechat users

Revision ID: 4451d29fc5d2
Revises: 20260414_0001
Create Date: 2026-04-15 15:50:48.071992

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4451d29fc5d2'
down_revision: Union[str, None] = '20260414_0001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('wechat_users', sa.Column('chat_mode', sa.String(length=32), nullable=False, server_default='understanding'))


def downgrade() -> None:
    op.drop_column('wechat_users', 'chat_mode')

