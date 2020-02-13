# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##  userテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null:false|
###  association
- has_many :group_users
- has_many :groups, through: :groups_users

##  textテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
###  association
- belongs_to : user
- belongs_to : group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group|string|null; false|

##  association
- has_many : groups_users
- has_many : users, through: :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###  Association
- belongs_to :group
- belongs_to :user
