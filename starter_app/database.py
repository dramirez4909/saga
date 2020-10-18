from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Security_Point,Role, Encounter, Patient, Provider, Activity

with app.app_context():
  # db.drop_all()
  db.create_all()

  demo = User(username = 'DemoUser', email = 'demo@aa.io', password ='password', first_name="Angela",last_name="Alegria")
  ian = User(username = 'Ian', email = 'ian@aa.io', password='password', first_name="Enrique",last_name="Ramirez")
  javier = User(username = 'Javier', email = 'javier@aa.io', password='password', first_name="Martin",last_name="Martinez")
  dean = User(username = 'Dean', email = 'dean@aa.io', password='password', first_name="Oscar",last_name="Holden")
  angela = User(username = 'Angela', email = 'angela@aa.io', password='password', first_name="Jonathan",last_name="Gutierez")
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password='password', first_name="Flor",last_name="Castillo")
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password='password', first_name="Alissa",last_name="Johnson")

  my_schedule_access = Security_Point(name="provider schedule access")
  orders_access = Security_Point(name="order creation")
  department_schedule_access = Security_Point(name="department schedule access")
  patient_search = Security_Point(name="patient search")
  chart_access = Security_Point(name="chart access")
  patient_user_access = Security_Point(name="patient user access")

  demo_provider =Provider(user_id=1,specialty="Family Medicine")
  demo_patient = Patient(firstName="Clare",lastName="Donohue=Meyer")


  my_schedule = Activity(name="My Schedule", required_security_point_id=1)
  orders = Activity(name="Place Orders", required_security_point_id=2)
  department_schedule = Activity(name="Dep. Schedule", required_security_point_id=3)
  search_patients = Activity(name="Patient Search",required_security_point_id=4)
  patient_chart = Activity(name="chart",required_security_point_id=5)

  provider_role = Role(name="provider")
  scheduler_role = Role(name="scheduler")
  demo.roles.append(provider_role)
  provider_role.security_points.append(my_schedule_access)
  provider_role.security_points.append(orders_access)
  provider_role.security_points.append(department_schedule_access)
  provider_role.security_points.append(patient_search)
  provider_role.security_points.append(chart_access)
  

  scheduler_role.security_points.append(department_schedule_access)

  db.session.add(demo)
  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(my_schedule_access)
  db.session.add(orders_access)
  db.session.add(department_schedule_access)
  db.session.add(patient_search)
  db.session.add(chart_access)
  db.session.add(patient_user_access)
  db.session.add(my_schedule)
  db.session.add(orders)
  db.session.add(department_schedule)
  db.session.add(search_patients)
  db.session.add(patient_chart)
  db.session.add(provider_role )
  db.session.add(scheduler_role)
  db.session.add(demo_patient)


  db.session.commit()