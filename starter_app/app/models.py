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
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"), nullable=True)

  encounters = db.relationship("Encounter",back_populates="type")
  department = db.relationship("Department",back_populates="encounter_types")

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

class Order_Type(db.Model):
  __tablename__ = "order_types"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"), nullable=True)

  orders = db.relationship("Order",back_populates="type")
  department = db.relationship("Department",back_populates="order_types")


  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }


class Order(db.Model):
  __tablename__ = "orders"
  id = db.Column(db.Integer, primary_key = True)
  order_type = db.Column(db.Integer, db.ForeignKey("order_types.id"), nullable = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  status = db.Column(db.String(40), nullable = True)
  encounter_id = db.Column(db.Integer, db.ForeignKey("encounters.id"), nullable=True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"), nullable=True)
  created_at = db.Column(db.DateTime, nullable = True)
  cui = db.Column(db.String(30), nullable=True)
  name = db.Column(db.String(2000), nullable = True)
  note = db.Column(db.String(2000), nullable = True)


  type = db.relationship("Order_Type",back_populates="orders")
  patient = db.relationship("Patient",back_populates="orders")
  provider = db.relationship("Provider",back_populates="orders")
  encounter = db.relationship("Encounter",back_populates="orders")
  department = db.relationship("Department",back_populates="orders")

  def to_dict(self):
    if self.encounter:
      return{
        "id":self.id,
        "patient": self.patient.name_and_id(),
        "encounter": self.encounter_id,
        "status": self.status,
        "provider": self.provider.name_and_id(),
        "type":self.type.name,
        "department":{"id":self.department_id},
        "created_at": self.created_at,
        "provider_id": self.provider_id,
        "cui":self.cui,
        "name": self.name,
        "note": self.note
      }
    else: 
      return{
        "id":self.id,
        "patient": self.patient.name_and_id(),
        "status": self.status,
        "provider": self.provider.name_and_id(),
        "type":self.type.name,
        "department":{"id":self.department_id},
        "created_at": self.created_at,
        "provider_id": self.provider_id,
        "cui":self.cui,
        "name": self.name,
        "note": self.note
      }
    
  def basic(self):
    if self.encounter:
      return{
        "id":self.id,
        "patient": self.patient.name_and_id(),
        "encounter": self.encounter_id,
        "status": self.status,
        "provider": self.provider.name_and_id(),
        "type":self.type.name,
        "department":{"id":self.department_id},
        "created_at": self.created_at,
        "provider_id": self.provider_id,
        "cui":self.cui,
        "name": self.name,
        "note": self.note
      }
    else: 
      return{
        "id":self.id,
        "patient": {"lastName": self.patient.lastName, "firstName":self.patient.firstName, "fullName": self.patient.firstName + " " + self.patient.lastName},
        "status": self.status,
        "provider": self.provider.name_and_id(),
        "type":self.type.name,
        "department":{"id":self.department_id},
        "created_at": self.created_at,
        "provider_id": self.provider_id,
        "cui":self.cui,
        "name": self.name,
        "note": self.note
      }

class Problem(db.Model):
  __tablename__ = "problems"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  name = db.Column(db.String(2000), nullable = True)
  created_at = db.Column(db.DateTime, nullable = True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)
  type = db.Column(db.String(40), nullable = True)
  cui = db.Column(db.String(50),nullable=True)
  note = db.Column(db.String(2000), nullable = True)
  current = db.Column(db.String(50), nullable=True)

  patient = db.relationship("Patient",back_populates="problems")
  provider = db.relationship("Provider",back_populates="problems")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "created_at": self.created_at,
      "type":self.type,
      "cui":self.cui,
      "provider_id":self.provider_id,
      "note":self.note,
      "current":self.current,
    }
  
  def basic(self):
    return {
      "id": self.id,
      "name": self.name,
      "created_at": self.created_at,
      "type":self.type,
      "cui":self.cui,
      "provider_id":self.provider_id,
      "note":self.note,
      "current":self.current,
    }


class Organization(db.Model):
  __tablename__ = "organizations"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(180), nullable = False)
  
  departments = db.relationship("Department", back_populates="organization")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }


class Department(db.Model):
  __tablename__ = "departments"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(50),nullable=True)
  specialty= db.Column(db.String(50),nullable=True)
  picture = db.Column(db.String(800),nullable=True)
  address_line_one = db.Column(db.String(400),nullable=True)
  address_line_two = db.Column(db.String(400),nullable=True)
  address_city = db.Column(db.String(40),nullable=True)
  address_state = db.Column(db.String(40),nullable=True)
  address_zip = db.Column(db.String(40),nullable=True)
  organization_id = db.Column(db.Integer,db.ForeignKey("organizations.id"))
  time_open = db.Column(db.String(40),nullable=True)
  time_closed = db.Column(db.String(40),nullable=True)
  
  orders = db.relationship("Order",back_populates="department")
  encounters = db.relationship("Encounter",back_populates="department")
  encounter_types = db.relationship("Encounter_Type",back_populates="department")
  order_types = db.relationship("Order_Type",back_populates="department")
  providers = db.relationship("Provider",back_populates="department")
  organization = db.relationship("Organization",back_populates="departments")
  resources = db.relationship("Resource",back_populates="department")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "orders":[order.to_dict() for order in self.orders],
      "encounters": [encounter.to_dict() for encounter in self.encounters],
      "providers": [provider.to_dict() for provider in self.providers],
      "resources": {resource.id:resource.to_dict() for resource in self.resources},
      "organization": self.organization.to_dict(),
      "specialty":self.specialty,
      "address_line_one":self.address_line_one,
      "address_line_two":self.address_line_two,
      "address_city":self.address_city,
      "address_state":self.address_state,
      "address_zip":self.address_zip,
      "time_closed":self.time_closed,
      "time_open":self.time_open,
    }

class Note(db.Model):
  __tablename__ = "notes"
  id = db.Column(db.Integer, primary_key = True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
  content = db.Column(db.String(2000), nullable = True)
  created_at = db.Column(db.DateTime, nullable = True)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"), nullable=True)
  encounter_id = db.Column(db.Integer, db.ForeignKey("encounters.id"),nullable=True)
  
  encounter = db.relationship("Encounter",back_populates="notes")
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
  
  def basic(self):
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
  cui = db.Column(db.String(50),nullable=True)
  current = db.Column(db.String(50),nullable=True,default="true")
  
  patient = db.relationship("Patient",back_populates="medications")
  def to_dict(self):
    return {
      "id": self.id,
      "last_fill": self.last_fill,
      "name": self.name,
      "instructions": self.instructions,
      "created_at": self.created_at,
      "patient":{"id":self.patient.id},
      "cui":self.cui,
      "provider_id":self.provider_id,
      "current":self.current,
    }
  
  def basic(self):
    return {
      "id": self.id,
      "last_fill": self.last_fill,
      "name": self.name,
      "instructions": self.instructions,
      "created_at": self.created_at,
      "patient":{"id":self.patient.id},
      "cui":self.cui,
      "provider_id":self.provider_id,
      "current":self.current,
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
  
  def basic(self):
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
  picture = db.Column(db.String(800),nullable=True)
  bmi = db.Column(db.String(20),nullable=True)
  weight = db.Column(db.String(20),nullable=True)
  height = db.Column(db.String(20),nullable=True)
  beats_per_minute = db.Column(db.String(20),nullable=True)
  mrn = db.Column(db.String(20),nullable=True)
  smoker = db.Column(db.String(20),nullable=True)
  occupation = db.Column(db.String(50),nullable=True)
  pronouns = db.Column(db.String(50),nullable=True)
  blood_type = db.Column(db.String(50),nullable=True)
  coverage = db.Column(db.String(80),nullable=True)
  visit_copay = db.Column(db.String(80),nullable=True)
  temperature = db.Column(db.String(80),nullable=True)

  medications = db.relationship("Medication",back_populates="patient")
  overtime_patient_items = db.relationship("Overtime_Patient_Item",back_populates="patient")
  encounters= db.relationship("Encounter",back_populates="patient")
  orders = db.relationship("Order",back_populates="patient")
  providers = db.relationship("Provider",secondary=care_teams, back_populates="patients")
  problems = db.relationship("Problem",back_populates="patient")
  notes = db.relationship("Note",back_populates="patient")
  allergies = db.relationship("Allergy",back_populates="patient")

  def without_orders(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "fullName": f"{self.lastName}, {self.firstName}",
      "dob": self.dob,
      "bloodType":self.blood_type,
      "mrn": self.mrn,
      "beats_per_minute": self.beats_per_minute,
      "height": self.height,
      "weight": self.weight,
      "occupation":self.occupation,
      "ethnicity": self.ethnicity,
      "sex":self.sex,
      "temperature":self.temperature,
      "smoker":self.smoker,
      "coverage":self.coverage,
      "visit_copay":self.visit_copay,
      "pronouns":self.pronouns,
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
      "bmi": self.bmi,
      "picture":self.picture
    }

  def without_encounters(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "temperature":self.temperature,
      "lastName": self.lastName,
      "fullName": f"{self.lastName}, {self.firstName}",
      "dob": self.dob,
      "bloodType":self.blood_type,
      "mrn": self.mrn,
      "coverage":self.coverage,
      "visit_copay":self.visit_copay,
      "beats_per_minute": self.beats_per_minute,
      "height": self.height,
      "weight": self.weight,
      "occupation":self.occupation,
      "ethnicity": self.ethnicity,
      "sex":self.sex,
      "smoker":self.smoker,
      "work_phone":self.work_phone,
      "home_phone":self.home_phone,
      "mobile_phone":self.mobile_phone,
      "address_line_one":self.address_line_one,
      "address_line_two":self.address_line_two,
      "address_line_three":self.address_line_three,
      "address_state":self.address_state,
      "address_city":self.address_city,
      "address_zip":self.address_zip,
      "orders":[order.to_dict() for order in self.orders],
      "medications": [medication.to_dict() for medication in self.medications],
      "allergies": [allergy.to_dict() for allergy in self.allergies],
      "notes": [note.to_dict() for note in self.notes],
      "problems": [problem.to_dict() for problem in self.problems],
      "bmi": self.bmi,
      "picture":self.picture
    }

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "fullName": f"{self.lastName}, {self.firstName}",
      "dob": self.dob,
      "mrn": self.mrn,
      "beats_per_minute": self.beats_per_minute,
      "height": self.height,
      "blood_type":self.blood_type,
      "coverage":self.coverage,
      "visit_copay":self.visit_copay,
      "weight": self.weight,
      "occupation":self.occupation,
      "ethnicity": self.ethnicity,
      "sex":self.sex,
      "smoker":self.smoker,
      "work_phone":self.work_phone,
      "home_phone":self.home_phone,
      "mobile_phone":self.mobile_phone,
      "address_line_one":self.address_line_one,
      "address_line_two":self.address_line_two,
      "address_line_three":self.address_line_three,
      "address_state":self.address_state,
      "address_city":self.address_city,
      "address_zip":self.address_zip,
      "orders":{order.id:order.basic() for order in self.orders},
      "medications": {medication.id: medication.basic() for medication in self.medications},
      "allergies": {allergy.id: allergy.basic() for allergy in self.allergies},
      "notes": {note.id : note.basic() for note in self.notes},
      "problems": {problem.id : problem.basic() for problem in self.problems},
      "encounters": {encounter.id: encounter.basic() for encounter in self.encounters},
      "temperature":self.temperature,
      "providers": {provider.id: provider.name_and_id() for provider in self.providers},
      "bmi": self.bmi,
      "picture":self.picture,
      "overtime_items": {item.id : item.to_dict() for item in self.overtime_patient_items}
    }

  def name_and_id(self):
    return {
      "id": self.id,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "fullName":f"{self.lastName}, {self.firstName}",
    }

class Provider(db.Model):
  __tablename__ = "providers"
  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
  specialty = db.Column(db.String(40), nullable = True)
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"), nullable=True)

  patients = db.relationship("Patient",secondary=care_teams, back_populates="providers")
  user = db.relationship("User", back_populates="provider")
  orders = db.relationship("Order",back_populates="provider")
  encounters= db.relationship("Encounter",back_populates="provider")
  problems = db.relationship("Problem",back_populates="provider")
  notes = db.relationship("Note",back_populates="provider")
  department = db.relationship("Department",back_populates="providers")

  def to_dict(self): 
    return {
      "id":self.id,
      "first_name": self.user.first_name,
      "last_name": self.user.last_name,
      "full_name": f"{self.user.first_name} {self.user.last_name}",
      "picture": self.user.profile_picture_path,
      "specialty": self.specialty
    }

  def name_and_id(self):
    return {
      "id":self.id,
      "first_name": self.user.first_name,
      "last_name": self.user.last_name,
      "full_name": f"{self.user.first_name} {self.user.last_name}",
    }

  def without_encounters(self):
    return {
      "id":self.id,
      "user_id":self.user.id,
      "first_name": self.user.first_name,
      "last_name": self.user.last_name,
      "full_name": f"{self.user.first_name} {self.user.last_name}",
    }
  
  def without_orders(self):
    return {
      "id":self.id,
      "first_name": self.user.first_name,
      "last_name": self.user.last_name,
      "full_name": f"{self.user.first_name} {self.user.last_name}",
    }

class Encounter(db.Model):
  __tablename__ = "encounters"
  id = db.Column(db.Integer, primary_key = True)
  encounter_type_id = db.Column(db.Integer, db.ForeignKey("encounter_types.id"),nullable=False)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"),nullable=False)
  provider_id = db.Column(db.Integer, db.ForeignKey("providers.id"),nullable=False)
  date = db.Column(db.DateTime, nullable=True)
  start = db.Column(db.DateTime, nullable=True)
  end = db.Column(db.DateTime, nullable=True)
  status = db.Column(db.String, nullable=True)
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"),nullable=True)
  resource_id = db.Column(db.Integer, db.ForeignKey("resources.id"),nullable=True)

  resource = db.relationship("Resource",back_populates="encounters")
  notes = db.relationship("Note",back_populates="encounter")
  provider = db.relationship("Provider",back_populates="encounters")
  patient = db.relationship("Patient",back_populates="encounters")
  orders = db.relationship("Order",back_populates="encounter")
  type = db.relationship("Encounter_Type",back_populates="encounters")
  department = db.relationship("Department",back_populates="encounters")

  def without_patient(self):
    return {
      "id": self.id,
      "orders": [order.to_dict() for order in self.orders],
      "patient": self.patient.without_encounters(),
      "type": self.type.to_dict(),
      "date": self.date,
      "status": self.status,
      "start": self.start,
      "end":self.end,
      "provider":self.provider.without_encounters(),
      "resource":{"id":self.resource_id,"name":self.resource.name},
      "department":{"id":self.department_id,"name":self.department.name}

    }

  def without_orders(self):
    return {
      "id": self.id,
      "provider": self.provider.without_encounters(),
      "patient": self.patient.without_orders(),
      "type": self.type.to_dict(),
      "date": self.date,
      "status": self.status,
      "provider_id":self.provider_id,
      "resource_id":self.resource_id,
      "start": self.start,
      "end":self.end
    }
  
  def basic(self):
    return {
      "id": self.id,
      "patient_full_name": self.patient.firstName + " " + self.patient.lastName,
      "date": self.date,
      "status": self.status,
      "resource":{"id":self.resource_id,"name":self.resource.name},
      "resource_id":self.resource_id,
      "start": self.start,
      "end":self.end,
      "orders":[order.basic() for order in self.orders],
      "provider_id":self.provider_id,
      "provider":self.provider.name_and_id(),
      "type": self.type.to_dict(),
      "patient": self.patient.name_and_id(),
      "department":{"id":self.department.id,"name":self.department.name},
    }

  def to_dict(self):
    if self.department:
      return {
        "id": self.id,
        "patient": self.patient.to_dict(),
        # "provider": self.provider.without_encounters(),
        "type": self.type.to_dict(),
        "department_id": self.department_id,
        "date": self.date,
        "status": self.status,
        "start": self.start,
        "resource_id": self.resource_id,
        "end":self.end,
        "provider_id":self.provider_id,
        "department": {"id": self.department.id, "name": self.department.name},
        "resource": {"id": self.resource.id, "name": self.resource.name}
      }
    else:
      return {
        "id": self.id,
        "patient": self.patient.to_dict(),
        # "provider": self.provider.without_encounters(),
        "type": self.type.to_dict(),
        "department_id": self.department_id,
        "date": self.date,
        "status": self.status,
        "resource_id":self.resource_id,
        "provider_id":self.provider_id,
        "provider":self.provider.without_encounters(),
        "start": self.start,
        "end":self.end,
        "resource": {"id": self.resource.id, "name": self.resource.name},
      }

class Security_Point(db.Model):
  __tablename__ = "security_points"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)

  roles = db.relationship("Role",secondary=role_security,back_populates="security_points")
  users = db.relationship("User",secondary=user_security, back_populates="security_points")
  activity = db.relationship("Activity",back_populates="security_point",uselist=False)

  def to_dict(self):
    if self.activity: 
      return {
        "id": self.id,
        "name": self.name,
        "activity": self.activity.to_dict()
      }
    else:
      return {
        "id": self.id,
        "name": self.name,
      }


class Resource(db.Model):
  __tablename__ = "resources"
  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  department_id = db.Column(db.Integer, db.ForeignKey("departments.id"),nullable=False)
  active = db.Column(db.Boolean, nullable=False)

  department = db.relationship("Department",back_populates="resources")
  encounters = db.relationship("Encounter",back_populates="resource")

  def to_dict(self):
    return {
      "id":self.id,
      "name":self.name,
      "encounters": [encounter.to_dict() for encounter in self.encounters],
      "department_id":self.department_id,
      "department": {"id":self.department_id, "name":self.department.name},
      "active":self.active
    }
  
  def name_and_id(self):
    return {
      "id": self.id,
      "name": self.name,
      "active":self.active
    }


class Overtime_Patient_Item(db.Model):
  __tablename__ = "overtime_patient_items"

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  value = db.Column(db.String(40), nullable = False)
  date = db.Column(db.DateTime, nullable=True)
  patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"),nullable=False)
  
  patient = db.relationship("Patient",back_populates="overtime_patient_items")

  def to_dict(self):
    return {
      "id":self.id,
      "value":self.value,
      "date":self.date,
      "name":self.name
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
      "security_points": {security_point.id: security_point.to_dict() for security_point in self.security_points}
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
  has_temp_password = db.Column(db.Boolean, default=False)
  is_draft = db.Column(db.Boolean, default=False)

  provider = db.relationship("Provider", back_populates="user")
  roles = db.relationship("Role",secondary=user_roles, back_populates="users")
  security_points = db.relationship("Security_Point",secondary=user_security, back_populates="users")

  def to_dict(self):
    if self.provider:
      return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "provider": self.provider[0].to_dict(),
        "roles": {role.id: role.to_dict() for role in self.roles},
        "security_points": {security_point.id: security_point.to_dict() for security_point in self.security_points},
        "picture": self.profile_picture_path,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "has_temp_password": self.has_temp_password,
        "is_draft":self.is_draft,
      }
    else:
      return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "roles": {role.id: role.to_dict() for role in self.roles},
        "security_points": {security_point.id: security_point.to_dict() for security_point in self.security_points},
        "picture": self.profile_picture_path,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "has_temp_password": self.has_temp_password,
        "is_draft":self.is_draft,
      }
  
  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)
