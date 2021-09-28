export const inputFormElements = [
    {
        name: "cardname", label:"Name on Card", placeholder: "Name on Card", 
        variant: "outlined", fullWidth:true, required:true, xs:12, sm:12
    }, 

    {
        name: "debitcreditnumber", type: "number",label:"Debit / Credit Card Number ", placeholder: "Debit / Credit Card Number", 
        variant: "outlined", fullWidth:true, required:true, xs:12, sm:12
    }, 

    {
        name: "month", type: "number", label:"MM", placeholder: "Expiry Month", 
        variant: "outlined", fullWidth:true, required:true, xs:12, sm:4
    }, 

    {
        name: "year", type: "number", label:"YYYY", placeholder: "Expiry Year", 
        variant: "outlined", fullWidth:true, required:true, xs:12, sm:4
    }, 


    {
        name: "cvvr", type: "number", label:"Enter CVV", placeholder: "Enter CVV", 
        variant: "outlined", fullWidth:true, required:true, xs:12, sm:4
    }, 

    
]
