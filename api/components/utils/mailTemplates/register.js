module.exports = {   
    en:{
        messageT:"Saludos %name, gracias por escoger nuestros servicios. Please click the button below to activate your account. Para activar su usuario utilice este código %code",
        messageH:`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,300;8..144,400;8..144,600&display=swap"
              rel="stylesheet"
            />
            <title>Registro de nuevo Usuario</title>
          </head>
          <style>
            * {
                font-family: "Roboto Flex", sans-serif;
                box-sizing: border-box;
              }
              body {
                width: 100%;
                margin: 0;
              }
              .header {
                padding: 4px 20px;
              }
              .content {
                width: 100%;
                max-width: 600px;
                border:1px solid #016936;
                border-radius: 4px;
              }
              .innerpadding {
                padding: 0 20px 20px 20px;
              }
              .top-padding {
                padding-top: 20px;
              }
              .borderbottom {
                border-bottom: 1px solid #016936;
              }      
              .tag {
                background-color: #016936;
                color: #fff;
                padding: 2px 6px;
                border-radius: 12px;
              }
              h3 {
                margin: 0;
              }
            .text {
              display: inline-block;
              text-align: justify;
              margin: 10px 0;
              font-size: 18px;
            }
            .btn-primary {
              margin-top: 12px;
              background-color: #017f81;
              padding: 12px 22px;
              color: #fff;
              border: none;
              border-radius: 6px;
              cursor: pointer;
            }
          </style>
          <body>
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="padding: 50px 8px;"
            >
              <tr>
                <td>
                  <table
                    bgcolor="#f6f8f1"
                    class="content"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <tr>
                      <td bgcolor="#016936" class="header" style="width: 100%;">
                        <table
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr>
                            <td height="70">
                              <h2 style="color: #fff;">Laviup</h2>
                            </td>
                          </tr>
                        </table>                
                      </td>
                    </tr>
                    <tr>
                      <td class="innerpadding top-padding">
                        <table
                          width="300"
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr>
                            <td>
                              <h3>Confirmación de registro de usuario</h3>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="innerpadding">
                        <table
                          width="100%"
                          align="left"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr>
                            <td>
                              <span class="text">
                              Saludos %name, gracias por escoger nuestros servicios. Para activar su usuario utilice el siguiente código %code</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
            </table>
          </body>
        </html>
        
        `,
        subject:"Registro de nuevo usuario"
    }
}