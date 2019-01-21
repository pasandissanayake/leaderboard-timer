keys:
	"t" - toggle view between leaderboard and timer
	">" - reset timer
	<space> - start/ pause timer

files:
	"index.html" - main page
	"data.csv" - team names and scores

configuation:
	js/timer.js
		DURATION - timer duration in miliseconds
		CLOCK_FACE - string to be shown when timer is reset
		
	js/csv.js
		CSV_FILE - path to csv file
		UPDATE_INTERVAL - refreshing interval for new data;
		NATURAL_REFRESH_INTERVAL - animation interval
		LENGTH - length of the list to be shown