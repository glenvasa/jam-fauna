const axios = require("axios");
require('dotenv').config();

exports.handler = async (event) => {
  const GET_LINKS = `
        query{
            allLinks{
                data {
                    name
                    _id
                    url
                    description
                    archived    
            }
        }    
        }`;

     const {data} = await axios({
         url: 'https://graphql.fauna.com/graphql',
         method: 'POST',
         headers: {
             Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`
         },
         data: {
             query: GET_LINKS,
            //  we're not making a mutation here, we're just requesting data re: all links
            // so we can leave 'variables' as an empty object
             variables: {}
         }
     })   

     console.log(data);
     return {
         statusCode: 200,
         body: JSON.stringify(data)
     }
};
