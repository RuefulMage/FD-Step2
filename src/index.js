import './assets/scss/style-delete.scss';
import 'nouislider/distribute/nouislider.css';
import 'air-datepicker/src/sass/datepicker.scss';
import 'air-datepicker/src/sass/navigation.scss';
import 'air-datepicker/src/sass/cell.scss';
import 'air-datepicker/src/sass/timepicker.scss';

function importAll(context) {
  context.keys().forEach(context);
}
importAll(require.context('./', true, /(?<!(style-delete))(\.scss|\.js)$/));
