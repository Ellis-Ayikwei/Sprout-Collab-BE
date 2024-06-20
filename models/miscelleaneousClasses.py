#!/usr/bin/python3
from enum import Enum
class status(Enum):
    pending = "pending"
    in_progress = "in progress"
    done = "done"
    paused = "paused"