from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

user_roles = db.Table(
  "user_roles",
  db.Model.metadata,
  db.Column("user_id",db.Integer, db.ForeignKey("users.id"),primary_key=True),
  db.Column("role_id",db.Integer, db.ForeignKey("roles.id"),primary_key=True)
)

user_security = db.Table(
  "user_security",
  db.Model.metadata,
  db.Column("user_id",db.Integer, db.ForeignKey("users.id"),primary_key=True),
  db.Column("security_point_id",db.Integer, db.ForeignKey("security_points.id"),primary_key=True)
)

role_security = db.Table(
  "role_security",
  db.Model.metadata,
  db.Column("role_id",db.Integer, db.ForeignKey("roles.id"),primary_key=True),
  db.Column("security_point_id",db.Integer, db.ForeignKey("security_points.id"),primary_key=True)
)

class Encounter_Type(db.Model):
  __tablename__ = "encounter_types"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)

  encounters = db.relationship("Encounter",back_populates="type")


class Order(db.Model):
  __tablename__ = "orders"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  status = db.Column(db.String(40), nullable = True)
  encounter_id = db.Column(db.Integer, db.ForeignKey("encounters.id"), nullable=True)
  patient = db.relationship("Patient",back_populates="orders")
  encounter = db.relationship("Encounter",back_populates="orders")


class Patient(db.Model):
  __tablename__ = "patients"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  orders = db.relationship("Order",back_populates="patient")
  

class Encounter(db.Model):
  __tablename__ = "encounters"
  id = db.Column(db.Integer, primary_key = True)
  encounter_type_id = db.Column(db.Integer, db.ForeignKey("encounter_types.id"))

  orders = db.relationship("Order",back_populates="encounter")
  type = db.relationship("Encounter_Type",back_populates="encounters")

class Security_Point(db.Model):
  __tablename__ = "security_points"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)

  roles = db.relationship("Role",secondary=role_security,back_populates="security_points")
  users = db.relationship("User",secondary=user_security, back_populates="security_points")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }


class Role(db.Model):
  __tablename__ = "roles"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)

  users = db.relationship("User",secondary=user_roles, back_populates="roles")
  security_points = db.relationship("Security_Point",secondary=role_security, back_populates="roles")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }

class User(db.Model,UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password= db.Column(db.String(100), nullable = False)
  profile_picture_path = db.Column(db.String(500), nullable=True)
  first_name = db.Column(db.String(100), nullable=True)
  last_name = db.Column(db.String(100), nullable=True)

  roles = db.relationship("Role",secondary=user_roles, back_populates="users")
  security_points = db.relationship("Security_Point",secondary=user_security, back_populates="users")

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
  
  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)
