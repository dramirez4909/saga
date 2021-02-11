import os

AWS_SECRET_KEY=os.environ.get('S3_SECRET_ACCES_KEY')
AWS_ACCESS_KEY=os.environ.get('S3_KEY')
AWS_BUCKET_NAME=os.environ.get('S3_BUCKET')

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True