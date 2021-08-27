let db;
let budget;
  
    request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore(pending, { autoIncrement: true });
    };
  
    request.onerror = function(e) {
        console.log(`${target.errorCode}`);
        function saveRecord(record) {
            const transaction = db.transaction(['budget'], 'readwrite');
            const store = transaction.objectStore('budget');
            store.add(record);
          }
    };
  
    request.onsuccess = function(event) {
        db = db = event.target.result;
  
    db.onerror = function(e) {
        console.log(`error ${event.target.errorCode}`);
    };



  function checkDatabase() {
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStore("pending");
        const getAll = store.getAll();


        getAll.onsuccess = function () {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    transaction = db.transaction(['budget'], 'readwrite');
                    const newStore = transaction.objectStore('budget');
                    currentStore.clear();
                    console.log("store is clear");    

            });
        }
      };
    }

    window.addEventListener('online', checkDatabase);