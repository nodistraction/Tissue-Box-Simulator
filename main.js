function KleenexMansizeTissueBox() {
	this.tissues = [];
	
	// Read only properties
	this.totalTissues = 100;
	
	// Standard properties
	this.isOpen = false;
	this.isEmpty = false;
	this.tissuesLeft = 100;
	this.tissuesUsed = this.totalTissues - this.tissuesLeft;
	
	// Filling box with standard (unsplit) tissues
	for (i = 0; i < this.totalTissues; i++) {
		this.tissues[i] = new KleenexMansizeTissue(false);
	}
	
	this.tissues[this.tissuesLeft - 1].isAtTop = true;
	
	// Methods
	this.openBox = function() {
		if (this.isOpen) {
			console.log('Cannot open the box if the box is already open');
		}
		
		else {
			console.log('Opening the box ...');
			this.isOpen = true;
		}
	}
	
	this.readyNextTissue = function() {
		if (!this.isOpen) {
			console.log('Cannot ready next tissue if the box isn\'t open');
		}
		
		else if (this.nextTissueReady) {
			console.log('Next tissue is already ready');
		}
		
		else {
			this.nextTissueReady = true;
			console.log('Next tissue now ready');
		}
	}
	
	this.removeTissue = function() {
		if (!this.isOpen) {
			console.log('Cannot take out a tissue if the box isn\'t open');
		}
		
		else if (this.isEmpty) {
			console.log('Cannot take out a tissue if the box is empty');
		}
		
		else {
			if (!this.nextTissueReady) {
				console.log('Readying the next tissue ...');
				this.nextTissueReady = true;
			}
			
			console.log('Removing top tissue ...');
			this.tissuesLeft--;
			
			if (this.tissuesLeft == 0) {
				console.log('The box is now empty');
				this.isEmpty = true;
			}
		}
	}
	
	this.removeMultipleTissues = function(removeNumber) {
		if (removeNumber >= this.tissuesLeft) {
			this.tissues.length = 0;
			this.tissuesLeft = 0;
			console.log('All remaining tissues removed. The box is now empty');
		}
		
		else {
			this.tissues.length = this.tissuesLeft - removeNumber;
			this.tissuesLeft -= removeNumber;
		}
	} 
}

function KleenexMansizeTissue(isSplit) {
	// Read only properties
	this.tissueWidth = 30;
	this.tissueHeight = 20;
	
	// Standard properties
	this.isAtTop = false;
	this.isReady = false;
	this.isOut = false;
	this.isUsed = false;
	
	this.tissuePly = function() {
		if (isSplit) {
			return 1;
		}
		
		else {
			return 2;
		}
	}
	
	/*
	// Accessors
	set tissuePly() {
		if (isSplit) {
			return 1;
		}
		
		else {
			return 2;
		}
	}*/
	
	// Methods
	this.splitTissue = function() {
		if (!this.isOut) {
			return false;
		}
		
		else {
			this.tissuePly = 1;
			return new KleenexMansizeTissue(true);
		}
	}
	
	this.use = function() {
		if (!this.isAtTop) {
			return false;
		}
		
		else {
			if (!this.isReady) {
				this.isReady = true;
			}
			
			else {
				if (!this.isOut) {
					this.isOut = true;
				}
				
				else {
					this.isUsed = true;
				}
			}
		}
	}
}

var tissueBoxBoughtYesterdayAtTesco = new KleenexMansizeTissueBox();
