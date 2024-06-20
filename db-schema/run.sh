# 创建测试数据库
pnpx wrangler d1 create telegram-miniapp-template-test

# 创建生产数据库
pnpx wrangler d1 create telegram-miniapp-template

# 本地环境执行 SQL
pnpx wrangler d1 execute telegram-miniapp-template-test --local --file=./db-schema/init_schema.sql

# 测试环境执行 SQL
pnpx wrangler d1 execute telegram-miniapp-template-test --remote --file=./db-schema/init_schema.sql

# 生产环境执行 SQL
pnpx wrangler d1 execute telegram-miniapp-template --remote --file=./db-schema/init_schema.sql
