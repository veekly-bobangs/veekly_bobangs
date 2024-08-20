from sqlalchemy import Column, Integer, String
from . import Base, AuditEntity

class Restaurant_Model(Base, AuditEntity):
    __tablename__ = 'restaurant'

    restaurant_id = Column(Integer, primary_key=True)
    restaurant_name = Column(String, nullable=False)

