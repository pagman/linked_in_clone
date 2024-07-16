#!/bin/bash
alembic stamp head
alembic revision --autogenerate -m "message"
alembic upgrade head