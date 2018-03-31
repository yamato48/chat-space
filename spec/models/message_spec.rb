require 'rails_helper'

Rspec.describe Message, type: :model do
  describe '#create' do
    context 'cansave' do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is vaild with image' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invaild without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include(を入力してください)
      end

      it 'is invaild without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invaild without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        except(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end
