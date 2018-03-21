class GroupUser < ApplicationRecord
  berongs_to :group
  berongs_to :user
end
