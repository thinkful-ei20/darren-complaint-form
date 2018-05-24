      <div className="form-input">
        <h2>Report a Problem with your delivery</h2>
        <form>

          <div className='form-input'>
            <label htmlFor="trackingNumber">Tracking number</label>
            <input type="text" name='trackingNumber' classname='trackingNumber'/>
          </div>

          <div className='form-input'>
            <label htmlFor="issue">What is your issue?</label>
            <select name="issue" id="issue">
              <option value="not-delivered">My delivery hasn't arrived</option>
              <option value="wrong-item">The wrong item was delivered</option>
              <option value="missing-part">Part of my order was missing</option>
              <option value="damaged">Some of my order arrived damaged</option>
              <option value="other">Other (give details below)</option>
            </select>
          </div>

          <div className='form-input'>
            <label htmlFor="details">Give more details (optional)</label> 
            <textarea name="details" id="details"></textarea>
          </div>

          <button type='submit'>Submit</button>

        </form>

      </div>