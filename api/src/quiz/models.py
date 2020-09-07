from sqlalchemy import Column, Integer, String, DateTime, func, Text, Numeric, ForeignKey, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from membership.models import Member

Base = declarative_base()


class QuizQuestion(Base):
    __tablename__ = 'quiz_questions'
    
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    question = Column(Text, nullable=False)
    answer_description = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())
    deleted_at = Column(DateTime)

    def __repr__(self):
        return f'QuizQuestion(id={self.id}, question={self.question})'

class QuizQuestionOption(Base):
    __tablename__ = 'quiz_question_options'
    
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    question_id = Column(Integer, ForeignKey(QuizQuestion.id), nullable=False)
    description = Column(Text, nullable=False)
    answer_description = Column(Text, nullable=False)
    correct = Column(Boolean, nullable=False)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())
    deleted_at = Column(DateTime)

    question = relationship(QuizQuestion, backref='options')

    def __repr__(self):
        return f'QuizQuestionOption(id={self.id}, description={self.description})'

class QuizAnswer(Base):
    __tablename__ = 'quiz_answers'
    
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    member_id = Column(Integer, ForeignKey(Member.member_id), nullable=False)
    question_id = Column(Integer, ForeignKey(QuizQuestion.id), nullable=False)
    option_id = Column(Integer, ForeignKey(QuizQuestionOption.id), nullable=False)
    correct = Column(Boolean, nullable=False)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())
    deleted_at = Column(DateTime)

    question = relationship(QuizQuestion, backref='answers')

    def __repr__(self):
        return f'QuizAnswer(id={self.id})'