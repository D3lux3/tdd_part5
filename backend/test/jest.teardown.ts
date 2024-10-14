import { sequelize } from "../src/utils/database";

const teardown = async () => {
    await sequelize.close();
    process.exit(0);
  };
  
  export default teardown;