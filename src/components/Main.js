import { BarChart, FileDownload, UploadFile } from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { blue, green, pink } from '@mui/material/colors';
import { Link } from 'react-router-dom';


function Mainx() {

  return <Grid container spacing={2} sx={{mt: 10}}>
    <Grid item xs={12} md={4}>
      <Card variant="outlined" sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CardHeader avatar={<Avatar sx={{bgcolor: blue[500]}}>1</Avatar>} title="Select a chart type!"/>
        <CardContent>
          <BarChart sx={{fontSize: '120px', color: blue[500]}} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
    <Card variant="outlined" sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CardHeader avatar={<Avatar sx={{bgcolor: pink[500]}}>1</Avatar>} title="Choose your data file(xls, xlsx or csv)! The program do not save or store your file!"/>
        <CardContent>
          <UploadFile sx={{fontSize: '120px', color: pink[500]}} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
    <Card variant="outlined" sx={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CardHeader avatar={<Avatar sx={{bgcolor: green[500]}}>1</Avatar>} title="Download your chart as png!"/>
        <CardContent>
          <FileDownload sx={{fontSize: '120px', color: green[500]}} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" sx={{mt: 6}}>
      <Button component={Link} to="/data-visualisation" variant="contained" size="large">Get started</Button>
      </Grid>
  </Grid>


}

export default Mainx;
