
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import User, db, Encounter

lists = Blueprint('lists', __name__)

@lists.route("/move-encounter",methods=["PATCH"])
def move_encounter():
    data = request.json
    encounter = Encounter.query.get(data["encounter-id"])
    encounter.list_id = int(data["add-to"])
    db.session.add(card)
    db.session.commit()
    removed_list = List.query.get(data["remove-from"])
    added_list = List.query.get(data["add-to"])
    board = Board.query.get(data["board"])
    format_board = { 
        "board":board.to_dict(), 
        "removeFromListId": removed_list.id,
        "addToListId": added_list.id,
        "removeFromCardObject":removed_list.cards_object(), 
        "addToCardObject":added_list.cards_object(),
        "card":card.to_dict()
        }
    return format_board

@lists.route("/create",methods=["POST"])
def create_list():
    data = request.json
    if not data:
        return {"welcome":"welcome"}
    ls = List(
        title=data['title'],
        description=data['description'],
        board_id=data['board_id']
    )
    db.session.add(ls)
    db.session.commit()
    format_list = ls.to_dict()
    listId = f"{ls.id}"
    return {"list":format_list}


@lists.route("/add-card",methods=["POST"])
def add_card():
    data = request.json
    card = Card(
        title=data['title'],
        description=data['description'],
        list_id=data['list_id']
    )
    db.session.add(card)
    db.session.commit()
    board = Board.query.get(data["boardId"])
    ls = List.query.get(card.list_id)
    format_res = {"listId":ls.id,"cardObject":ls.cards_object(),"board":board.to_dict(),"card":card.to_dict()}
    return format_res