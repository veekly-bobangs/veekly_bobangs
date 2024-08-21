from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from . import Base, AuditEntity

class Restaurant_Model(Base, AuditEntity):
    __tablename__ = 'restaurant'

    restaurant_id = Column(Integer, primary_key=True)
    restaurant_name = Column(String, nullable=False)
    outlets = relationship('Outlets', back_populates='restaurant')
