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

care_teams = db.Table(
  "care_teams",
  db.Model.metadata,
  db.Column("patient_id",db.Integer, db.ForeignKey("patients.id"),primary_key=True),
  db.Column("provider_id",db.Integer, db.ForeignKey("providers.id"),primary_key=True)
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


class Activity(db.Model):
  __tablename__ = "activities"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  required_security_point_id = db.Column(db.Integer, db.ForeignKey("security_points.id"), nullable=True)

  security_point = db.relationship("Security_Point",back_populates="activity")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }


class Order(db.Model):
  __tablename__ = "orders"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  status = db.Column(db.String(40), nullable = True)
  encounter_id = db.Column(db.Integer, db.ForeignKey("encounters.id"), nullable=True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)

  patient = db.relationship("Patient",back_populates="orders")
  provider = db.relationship("Provider",back_populates="orders")
  encounter = db.relationship("Encounter",back_populates="orders")


class Patient(db.Model):
  __tablename__ = "patients"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

  encounters= db.relationship("Encounter",back_populates="patient")
  orders = db.relationship("Order",back_populates="patient")
  providers = db.relationship("Provider",secondary=care_teams, back_populates="patients")


class Provider(db.Model):
  __tablename__ = "providers"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  specialty = db.Column(db.String(40), nullable = False)
  
  patients = db.relationship("Patient",secondary=care_teams, back_populates="providers")
  orders = db.relationship("Order",back_populates="provider")

class Encounter(db.Model):
  __tablename__ = "encounters"
  id = db.Column(db.Integer, primary_key = True)
  encounter_type_id = db.Column(db.Integer, db.ForeignKey("encounter_types.id"),nullable=True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"),nullable=True)

  patient = db.relationship("Patient",back_populates="encounters")
  orders = db.relationship("Order",back_populates="encounter")
  type = db.relationship("Encounter_Type",back_populates="encounters")

class Security_Point(db.Model):
  __tablename__ = "security_points"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)

  roles = db.relationship("Role",secondary=role_security,back_populates="security_points")
  users = db.relationship("User",secondary=user_security, back_populates="security_points")
  activity = db.relationship("Activity",back_populates="security_point",uselist=False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "activity": self.activity.to_dict()
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
      "name": self.name,
      "security_points": [{f"{security_point.id}":security_point.to_dict()} for (security_point) in self.security_points]
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
