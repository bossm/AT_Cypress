function generateEmail() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
  
    return `AT${date}${time}@test.com`;
  }

function getQuickJoinData(){
    let data =  {
                first_name: 'ATtest',
                last_name: 'ATtest',
                email: generateEmail(),
                phone: '8001234567',
                password: '123456789',
                };
    return data;
}
  

module.exports = {
  generateEmail,
  getQuickJoinData
};