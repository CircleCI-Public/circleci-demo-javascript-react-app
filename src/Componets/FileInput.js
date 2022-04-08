import React from 'react';

const Cards = ({ cards }) => {
    console.log({cards})

    return (
        <div class="row">
            <form class="form-inline">
                <div class="form-group">
                    <label for="files">Upload a CSV formatted file here:</label>
                    <input type="file" id="files"  class="form-control" accept=".csv" required />
                </div>
                <div class="form-group">
                    <button type="submit" id="submit-file" class="btn btn-primary">Upload File</button>
                </div>
        </form>
       </div>
    )
}

export default Cards