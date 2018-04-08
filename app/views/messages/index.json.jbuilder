json.array! @new_messages do |message|
  json.content  message.content
  json.image  message.image.url
  json.name  message.user.name
  json.time  message.created_at.strftime('%Y/%m/%d %H:%M:%S')
  json.id  message.id
end
