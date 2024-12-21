# models.py
from sqlalchemy.ext.automap import automap_base
from database import engine

Base = automap_base()
Base.prepare(engine, reflect=True)

# Access tables
User = Base.classes.user

Listing = Base.classes.listing

PurchaseHistory = Base.classes.purchase_history