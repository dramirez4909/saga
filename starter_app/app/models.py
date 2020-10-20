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

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }

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

class Problem(db.Model):
  __tablename__ = "problems"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  name = db.Column(db.String(40), nullable = True)
  created_at = db.Column(db.DateTime, nullable = True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)

  patient = db.relationship("Patient",back_populates="problems")
  provider = db.relationship("Provider",back_populates="problems")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "created_at": self.created_at
    }

class Note(db.Model):
  __tablename__ = "notes"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  content = db.Column(db.String(2000), nullable = True)
  created_at = db.Column(db.DateTime, nullable = True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)
  
  patient = db.relationship("Patient",back_populates="notes")
  provider = db.relationship("Provider",back_populates="notes")

  def to_dict(self):
    return {
      "id": self.id,
      "patient_id": self.patient_id,
      "content": self.content,
      "created_at": self.created_at,
      "provider_id": self.provider_id
    }

class Medication(db.Model):
  __tablename__ = "medications"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  last_fill = db.Column(db.DateTime, nullable=True)
  name = db.Column(db.String(2000), nullable = True)
  instructions = db.Column(db.String(2000), nullable = True)
  created_at = db.Column(db.DateTime, nullable = True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)
  
  patient = db.relationship("Patient",back_populates="medications")
  def to_dict(self):
    return {
      "id": self.id,
      "last_fill": self.last_fill,
      "name": self.name,
      "instructions": self.instructions,
      "created_at": self.created_at
    }


class Allergy(db.Model):
  __tablename__ = "allergies"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  noted = db.Column(db.DateTime, nullable=True)
  name = db.Column(db.String(2000), nullable = True)
  details = db.Column(db.String(2000), nullable = True)
  
  patient = db.relationship("Patient",back_populates="allergies")

  def to_dict(self):
    return {
      "id": self.id,
      "noted": self.noted,
      "name": self.name,
      "details": self.details
    }


class Patient(db.Model):
  __tablename__ = "patients"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  firstName = db.Column(db.String(40), nullable = True)
  lastName = db.Column(db.String(40), nullable = True)
  dob = db.Column(db.DateTime, nullable=True)
  ethnicity = db.Column(db.String(40),nullable=True)
  sex = db.Column(db.String(40),nullable=True)
  mobile_phone = db.Column(db.String(40),nullable=True)
  home_phone = db.Column(db.String(40),nullable=True)
  work_phone = db.Column(db.String(40),nullable=True)
  address_line_one = db.Column(db.String(80),nullable=True)
  address_line_two = db.Column(db.String(80),nullable=True)
  address_line_three = db.Column(db.String(80),nullable=True)
  address_city = db.Column(db.String(80),nullable=True)
  address_state = db.Column(db.String(20),nullable=True)
  address_zip = db.Column(db.String(20),nullable=True)
  medications = db.relationship("Medication",back_populates="patient")
  encounters= db.relationship("Encounter",back_populates="patient")
  orders = db.relationship("Order",back_populates="patient")
  providers = db.relationship("Provider",secondary=care_teams, back_populates="patients")
  problems = db.relationship("Problem",back_populates="patient")
  notes = db.relationship("Note",back_populates="patient")
  allergies = db.relationship("Allergy",back_populates="patient")

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "fullName": f"{self.lastName}, {self.firstName}",
      "dob": self.dob,
      "ethnicity": self.ethnicity,
      "sex":self.sex,
      "work_phone":self.work_phone,
      "home_phone":self.home_phone,
      "mobile_phone":self.mobile_phone,
      "address_line_one":self.address_line_one,
      "address_line_two":self.address_line_two,
      "address_line_three":self.address_line_three,
      "address_state":self.address_state,
      "address_city":self.address_city,
      "address_zip":self.address_zip,
      "medications": [medication.to_dict() for medication in self.medications],
      "allergies": [allergy.to_dict() for allergy in self.allergies],
      "notes": [note.to_dict() for note in self.notes],
      "problems": [problem.to_dict() for problem in self.problems],
      "enounters": [encounter.to_dict() for encounter in self.encounter]
    }

  def to_dictionary(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
    }

class Provider(db.Model):
  __tablename__ = "providers"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  specialty = db.Column(db.String(40), nullable = True)
  
  patients = db.relationship("Patient",secondary=care_teams, back_populates="providers")
  orders = db.relationship("Order",back_populates="provider")
  encounters= db.relationship("Encounter",back_populates="provider")
  problems = db.relationship("Problem",back_populates="provider")
  notes = db.relationship("Note",back_populates="provider")

class Encounter(db.Model):
  __tablename__ = "encounters"
  id = db.Column(db.Integer, primary_key = True)
  encounter_type_id = db.Column(db.Integer, db.ForeignKey("encounter_types.id"),nullable=True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"),nullable=True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"),nullable=True)
  date = db.Column(db.DateTime, nullable=True)
  status = db.Column(db.String, nullable=True)

  provider = db.relationship("Provider",back_populates="encounters")
  patient = db.relationship("Patient",back_populates="encounters")
  orders = db.relationship("Order",back_populates="encounter")
  type = db.relationship("Encounter_Type",back_populates="encounters")

  def to_dict(self):
    return {
      "id": self.id,
      "type": self.type.to_dict(),
      "date": self.date,
      "status": self.status,
    }

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
