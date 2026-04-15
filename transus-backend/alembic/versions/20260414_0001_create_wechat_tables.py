"""create wechat tables

Revision ID: 20260414_0001
Revises: 
Create Date: 2026-04-14
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260414_0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "wechat_users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("openid", sa.String(length=128), nullable=False),
        sa.Column("transus_user_id", sa.String(length=128), nullable=True),
        sa.Column("is_subscribed", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.Column("last_active", sa.DateTime(), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
    )
    op.create_index("ix_wechat_users_id", "wechat_users", ["id"], unique=False)
    op.create_index("ix_wechat_users_openid", "wechat_users", ["openid"], unique=True)

    op.create_table(
        "wechat_messages",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("openid", sa.String(length=128), nullable=False),
        sa.Column("role", sa.String(length=16), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("message_type", sa.String(length=32), nullable=False),
        sa.Column("wechat_msg_id", sa.String(length=64), nullable=True),
        sa.Column("latency_ms", sa.Integer(), nullable=True),
        sa.Column("error_code", sa.String(length=64), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.text("CURRENT_TIMESTAMP")),
        sa.UniqueConstraint("wechat_msg_id", name="uq_wechat_messages_wechat_msg_id"),
    )
    op.create_index("ix_wechat_messages_id", "wechat_messages", ["id"], unique=False)
    op.create_index("ix_wechat_messages_openid", "wechat_messages", ["openid"], unique=False)
    op.create_index("ix_wechat_messages_created_at", "wechat_messages", ["created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_wechat_messages_created_at", table_name="wechat_messages")
    op.drop_index("ix_wechat_messages_openid", table_name="wechat_messages")
    op.drop_index("ix_wechat_messages_id", table_name="wechat_messages")
    op.drop_table("wechat_messages")

    op.drop_index("ix_wechat_users_openid", table_name="wechat_users")
    op.drop_index("ix_wechat_users_id", table_name="wechat_users")
    op.drop_table("wechat_users")

