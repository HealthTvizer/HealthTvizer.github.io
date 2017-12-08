### HealthTVizer: Exploring Health Awareness in Twitter Data through Coordinated Multiple Views
<!-- Please click to watch the overview video. -->

<!-- [![ScreenShot](https://github.com/iDataVisualizationLab/DycomDetector/blob/master/images/play-btn.png)](http://www.myweb.ttu.edu/mdykabir/DycomDetectorIntro.mp4) -->

Video demo:  https://youtu.be/UjgwdhXVDKg

Online demo:  https://idatavisualizationlab.github.io/HealthTvizer/

Micro-blogging and social media data can help in predicting a variety of events and also able to detect the flow and evolution of the events and incidents like presidential elections and flu spread. Analyzing public user posts and shared information in social media can assist us in measuring various population characteristics, patterns, movements, and as well as the public health conditions. In this paper, we introduce HealthTVizer - a social media analytics tool, for exploring health awareness using Twitter data through interactive and interconnected multiple views. The tools assist a user in achieving a quick summary about the current diseases along with the geographical location on the United States map. 

We processed and analyzed over 57 million tweets and pick the tweets related to the diseases using topic modeling. After that, we categorized the tweets in 21 most frequent and discussed diseases on that time frame. We plot the diseases cloud and stream graph to show the change in the discussion about those diseases. Further, we added several visualization methods to find out valuable insights from the data. 

### HealthTVizer Visualization

HealthTVizer contains coordinated multiple views which highlight different tweet attributes: User ID, geolocation, keywords, time stamp, and the related disease. The following image shows the key features of the HealthTVizer. 

![ScreenShot](https://raw.githubusercontent.com/iDataVisualizationLab/HealthTvizer/master/images/teaser.png)

The key features of HealthTVizer are:

**Box A: Top user list** 
The top user list represents the users based on the number of tweets about any particular disease type. After clicking on diseases cloud, the list will automatically update with respect to the corresponding disease. On hovering on the user ID or user tweets count bar, a table will pop up displaying the 20 tweets of that particular user.

**Box B: Diseases map** 
The distribution of top 20 users tweets related to all 21 different diseases is depicted in the United States map represent in Box B.  On loading of the application the map shows the user tweets related all the diseases. However, if a viewer clicks on the particular disease from disease cloud the map and user list bar chart will be updated automatically and visualize the related disease tweets locations.  

**Box C: Network of Diseases and Keywords**
 The overview network of 20 diseases and top 50 popular keywords from January 6 to January 31, 2017, on Twitter are visualize on Box (c). The thickness of a link indicates the relationships frequency between the diseases and keywords based on the co-location in the same tweets.  

**Box D:** 
The diseases streamgraph represents the discussion about 21 diseases obtained by the hashtag of the tweets. The disease streamlines are ordered based on the frequency of the discussion on the related tweets. 

**Box E:**
By default, the diseases keywords streamgraph draw the streamline for top 50 keywords based on the frequency. However, if a user clicks on a disease from the diseases cloud, the keywords streamgraph will update interactively and displays the most frequent 50 keywords about that disease. 

### Use Case: 

After completing the development of HealthTvizer, we examine the application and explore some valuable and interesting user stories. 

**Use case on "Cancer"**

When we click on the "cancer" from the diseases, cloud our application automatically update the top user list and disease map. On the map, we notice a big circle in California as depicted in the following figure. 
![ScreenShot](https://raw.githubusercontent.com/iDataVisualizationLab/HealthTvizer/master/images/cancer.png)
On user list, we found that the user DwightJasonBain has more than a thousand tweets and we further examine what he is saying by clicking on the userID, and our application displays the tweets as the following figure. It reveals that the person was trying to raise fund for the treatment of his wife using "gofundme." The fundraising tweets drew the attention of the tweeter users and became spread a lot in California region. Hence we can observe a big black circle on the map. 
![ScreenShot](https://raw.githubusercontent.com/iDataVisualizationLab/HealthTvizer/master/images/cancerHover.png)

**Use case on "Autism"**
![ScreenShot](https://raw.githubusercontent.com/iDataVisualizationLab/HealthTvizer/master/images/autism.png)

In the above figure, (a) shows the keywords cloud for the Neurological diseases. When we observe the keywords, "autism" drew our attention, and we further examine that. If we hover on the keyword "autism" as the box (c) in the figure, we can notice a sudden hike in the streamgraph for the keyword "autism" on January 10, 2017. We further investigate it using the top user list and map. We discovered that there was something in San Marcos, CA. 

When we examine the user's tweets from the user list, we found that the user "AutismSocietySD" share lots of tweets about the "7th annual swimming with autism conference" on that day. Due to that reason, there was a high frequency of the keyword "autism" on January 10, 2017. 

### References
Previous work:  https://github.com/iDataVisualizationLab/RumorViz



