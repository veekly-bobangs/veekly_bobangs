from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from . import Base, AuditEntity

class Outlet_Model(Base, AuditEntity):
    __tablename__ = 'outlet'

    outlet_id = Column(Integer, primary_key=True)
    outlet_name = Column(String, nullable=False)
    longitude = Column(String, nullable=False)
    latitude = Column(String, nullable=False)
    address = Column(String, nullable=False)
    building_name = Column(String, nullable=False)
    restaurant_id = Column(Integer, ForeignKey('restaurant.restaurant_id'), nullable=False)
    restaurant = relationship("Restaurant", back_populates='outlet')
