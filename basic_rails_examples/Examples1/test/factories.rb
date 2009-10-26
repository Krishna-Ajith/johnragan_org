Factory.sequence :total do |n|
  "#{n + 499}".to_i 
end

Factory.define :order do |f|
  f.pay_type  'check'
  f.total     { Factory.next(:total) }
end