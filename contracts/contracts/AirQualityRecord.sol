// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AirQualityRecord
 * @dev Smart contract for storing critical air quality readings on the Polygon blockchain
 */
contract AirQualityRecord {
    struct PollutionReading {
        uint256 timestamp;      
        string readingId;        
        uint16 pm10Value;       
        uint16 pm25Value;        
        string location;         
        string category;
    }
    
    address public owner;
    address[] public authorizedSources;
    uint256 public readingsCount;
    mapping(uint256 => PollutionReading) public readings;
    mapping(string => bool) public readingExists;
    
    
    event PollutionReadingRecorded(
        uint256 indexed timestamp,
        string readingId,
        uint16 pm10Value,
        uint16 pm25Value,
        string category
    );
    
    event BatchReadingsRecorded(
        uint256 batchSize,
        uint256 startTimestamp,
        uint256 endTimestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorized() {
        bool isAuthorized = false;
        if (msg.sender == owner) {
            isAuthorized = true;
        } else {
            for (uint i = 0; i < authorizedSources.length; i++) {
                if (msg.sender == authorizedSources[i]) {
                    isAuthorized = true;
                    break;
                }
            }
        }
        require(isAuthorized, "Caller is not authorized");
        _;
    }
    
    /**
     * @dev Constructor to set the owner and initialize the authorized sources
     */

    constructor() {
        owner = msg.sender;
        authorizedSources.push(owner);
    }
    
    /**
     * @dev Add a new authorized source that can record readings
     * @param _source The address to authorize
     */
    function addAuthorizedSource(address _source) external onlyOwner {
        require(_source != address(0), "Invalid address");
        
        for (uint i = 0; i < authorizedSources.length; i++) {
            if (authorizedSources[i] == _source) {
                return; 
                //it will return if user is already authorized
            }
        }
        
        authorizedSources.push(_source);
    }
    
    /**
     * @dev Remove an authorized source
     * @param _source The address to remove
     */
    function removeAuthorizedSource(address _source) external onlyOwner {
        require(_source != owner, "Cannot remove owner");
        
        for (uint i = 0; i < authorizedSources.length; i++) {
            if (authorizedSources[i] == _source) {
                authorizedSources[i] = authorizedSources[authorizedSources.length - 1];
                authorizedSources.pop();
                return;
            }
        }
        
        revert("Address not found");
    }
    
    /**
     * @dev Record a single pollution reading
     * @param _timestamp Unix timestamp of the reading
     * @param _readingId Unique identifier for the reading
     * @param _pm10Value PM10 value (multiplied by 10)
     * @param _pm25Value PM2.5 value (multiplied by 10)
     * @param _location Location identifier
     * @param _category Pollution category
     */
    function recordReading(
        uint256 _timestamp,
        string calldata _readingId,
        uint16 _pm10Value,
        uint16 _pm25Value,
        string calldata _location,
        string calldata _category
    ) external onlyAuthorized {
        require(bytes(_readingId).length > 0, "Reading ID cannot be empty");
        require(!readingExists[_readingId], "Reading with this ID already exists");
        
        // Store the reading
        readings[readingsCount] = PollutionReading({
            timestamp: _timestamp,
            readingId: _readingId,
            pm10Value: _pm10Value,
            pm25Value: _pm25Value,
            location: _location,
            category: _category
        });
        
        // Mark reading as existing
        readingExists[_readingId] = true;
        
        // Increment count
        readingsCount++;
        
        // Emit event
        emit PollutionReadingRecorded(_timestamp, _readingId, _pm10Value, _pm25Value, _category);
    }
    
    /**
     * @dev Record multiple readings at once (gas efficient for bulk uploads)
     * @param _timestamps Array of timestamps
     * @param _readingIds Array of reading IDs
     * @param _pm10Values Array of PM10 values
     * @param _pm25Values Array of PM2.5 values
     * @param _locations Array of locations
     * @param _categories Array of categories
     */
    function batchRecordReadings(
        uint256[] calldata _timestamps,
        string[] calldata _readingIds,
        uint16[] calldata _pm10Values,
        uint16[] calldata _pm25Values,
        string[] calldata _locations,
        string[] calldata _categories
    ) external onlyAuthorized {
        uint256 batchSize = _timestamps.length;
        
        require(
            batchSize == _readingIds.length &&
            batchSize == _pm10Values.length &&
            batchSize == _pm25Values.length &&
            batchSize == _locations.length &&
            batchSize == _categories.length,
            "Array lengths do not match"
        );
        
        require(batchSize > 0, "Batch cannot be empty");
        require(batchSize <= 100, "Batch size too large"); // Gas limit protection
        
        uint256 startTimestamp = _timestamps[0];
        uint256 endTimestamp = _timestamps[0];
        
        for (uint256 i = 0; i < batchSize; i++) {
            require(bytes(_readingIds[i]).length > 0, "Reading ID cannot be empty");
            require(!readingExists[_readingIds[i]], "Reading with this ID already exists");
            
            // Update min/max timestamps
            if (_timestamps[i] < startTimestamp) {
                startTimestamp = _timestamps[i];
            }
            if (_timestamps[i] > endTimestamp) {
                endTimestamp = _timestamps[i];
            }
            
            // Store the reading
            readings[readingsCount + i] = PollutionReading({
                timestamp: _timestamps[i],
                readingId: _readingIds[i],
                pm10Value: _pm10Values[i],
                pm25Value: _pm25Values[i],
                location: _locations[i],
                category: _categories[i]
            });
            
            // Mark reading as existing
            readingExists[_readingIds[i]] = true;
            
            // Emit individual event
            emit PollutionReadingRecorded(
                _timestamps[i],
                _readingIds[i],
                _pm10Values[i],
                _pm25Values[i],
                _categories[i]
            );
        }
        
        // Update total count
        readingsCount += batchSize;
        
        // Emit batch event
        emit BatchReadingsRecorded(batchSize, startTimestamp, endTimestamp);
    }
    
    /**
     * @dev Get reading by index
     * @param _index The index of the reading
     */
    function getReading(uint256 _index) external view returns (
        uint256 timestamp,
        string memory readingId,
        uint16 pm10Value,
        uint16 pm25Value,
        string memory location,
        string memory category
    ) {
        require(_index < readingsCount, "Reading does not exist");
        
        PollutionReading memory reading = readings[_index];
        
        return (
            reading.timestamp,
            reading.readingId,
            reading.pm10Value,
            reading.pm25Value,
            reading.location,
            reading.category
        );
    }
    
    /**
     * @dev Get readings within a time range
     * @param _startTime Start timestamp
     * @param _endTime End timestamp
     * @param _limit Maximum number of readings to return
     * @param _offset Offset for pagination
     */
    function getReadingsByTimeRange(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _limit,
        uint256 _offset
    ) external view returns (
        uint256[] memory indices,
        uint256[] memory timestamps,
        string[] memory readingIds,
        uint16[] memory pm10Values,
        uint16[] memory pm25Values
    ) {
        require(_startTime <= _endTime, "Invalid time range");
        require(_limit <= 100, "Limit too large"); // Prevent gas limit issues
        
        // First pass: count matching readings
        uint256 matchCount = 0;
        uint256 skipped = 0;
        
        for (uint256 i = 0; i < readingsCount && matchCount < _limit + _offset; i++) {
            if (readings[i].timestamp >= _startTime && readings[i].timestamp <= _endTime) {
                if (skipped < _offset) {
                    skipped++;
                } else {
                    matchCount++;
                }
            }
        }
        
        // Adjust match count to respect limit
        matchCount = matchCount > _limit ? _limit : matchCount;
        
        // Initialize arrays
        indices = new uint256[](matchCount);
        timestamps = new uint256[](matchCount);
        readingIds = new string[](matchCount);
        pm10Values = new uint16[](matchCount);
        pm25Values = new uint16[](matchCount);
        
        // Second pass: populate arrays
        uint256 resultIndex = 0;
        skipped = 0;
        
        for (uint256 i = 0; i < readingsCount && resultIndex < matchCount; i++) {
            if (readings[i].timestamp >= _startTime && readings[i].timestamp <= _endTime) {
                if (skipped < _offset) {
                    skipped++;
                } else {
                    indices[resultIndex] = i;
                    timestamps[resultIndex] = readings[i].timestamp;
                    readingIds[resultIndex] = readings[i].readingId;
                    pm10Values[resultIndex] = readings[i].pm10Value;
                    pm25Values[resultIndex] = readings[i].pm25Value;
                    resultIndex++;
                }
            }
        }
        
        return (indices, timestamps, readingIds, pm10Values, pm25Values);
    }
    
    /**
     * @dev Check if a reading ID exists
     * @param _readingId The reading ID to check
     */
    function doesReadingExist(string calldata _readingId) external view returns (bool) {
        return readingExists[_readingId];
    }
    
    /**
     * @dev Get total number of authorized sources
     */
    function getAuthorizedSourcesCount() external view returns (uint256) {
        return authorizedSources.length;
    }
}