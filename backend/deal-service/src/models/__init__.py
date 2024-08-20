from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, DateTime, func
from flask_sqlalchemy import SQLAlchemy

Base = declarative_base()

db = SQLAlchemy(model_class=Base)

class AuditEntity():
    __abstract__ = True
    created_on = Column(DateTime, default=func.now())
    updated_on = Column(DateTime, default=func.now(), onupdate=func.now())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
