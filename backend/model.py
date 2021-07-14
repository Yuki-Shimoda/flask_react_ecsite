# import os

# from sqlalchemy import Boolean, CHAR, Column, Date, DateTime, Float, ForeignKey, Integer, String, Table, Text, UniqueConstraint, text
# from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import create_engine
# from sqlalchemy.orm import scoped_session, sessionmaker

# Base = declarative_base()
# metadata = Base.metadata

# app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:postgres@localhost:5432/fr_ec'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
# app.config['SECRET_KEY'] = 'secret_key'
# db = SQLAlchemy(app)


# class Department(Base):
#     __tablename__ = 'department'

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     code = Column(String(10), nullable=False, unique=True, comment='部署コード')
#     name = Column(String(64), comment="部署名")
#     created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
#     updated_at = Column(DateTime)

#     def __repr__(self):
#         return self.name

# class Employee(Base):
#     __tablename__ = 'employee'

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     first_name = Column(String(64), nullable=False, comment='名前')
#     last_name = Column(String(64), nullable=False, comment='苗字')
#     department_id = Column(ForeignKey('department.id', ondelete='SET NULL', onupdate='CASCADE'))
#     gender = Column(String(1), nullable=True, comment='性別')
#     birth_date = Column(Date, nullable=True, comment="生年月日")
#     created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
#     updated_at = Column(DateTime)

#     department = relationship('Department')

#     def __repr__(self):
#         return "%s, %s" % (last_name, first_name)