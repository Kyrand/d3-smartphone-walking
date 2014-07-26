## Visualizing Walking Using Smartphone Accelerometers
I wanted to try and visualize some multi-dimensional data and found some interesting <a href='https://archive.ics.uci.edu/ml/datasets/User+Identification+From+Walking+Activity'>sets</a> at the UCI Machine Learning Repository, from an <a href='http://www.cvc.uab.es/~petia/2011/Piero%20Personalization.pdf'>academic study</a> on user verification using biometric walking patterns. The x, y and z dimension accelerometer outputs can be displayed with three graphs and by using a heat-trace over time a distinct signature for each user is plotted.

The smartphone in your pocket can do more than just register your position with GPS or wifi (and send it back to who knows who?), most these days have built in accelerometers that can measure change in movement in three axes. In the study visualized below mobile phones were placed in the users' breastpockets and a simple course followed while data from the phone's accelerometers was recorded. The red, green and blue dots show a heat-trace for three individuals of accelerometer output over the time-trial, clearly showing their individual 'walking signature'. 

## Running

    $ python -m SimpleHTTPServer

or, with nodejs

    npm install -g http-server
    http-server
