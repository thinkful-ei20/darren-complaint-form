
export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const hasFive = value => value.length === 5 ? undefined : 'Must be 5 numbers long and less than 50000';

export const areNumbers = value => /^\d+$/.test(value) ? undefined : 'Must only consist of numbers';

// export const textarea = function(value) {
//   if(textarea){
//     console.log('details required');
    
//   }
// }

export const textarea = (value,props) => {
  if(props.issue === 'other' && !value){
    return 'details required for other issue'
  }
  console.log(props);    

  return undefined

}