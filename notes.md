-   when servers are loaded, save them in the db

    -   user_id
    -   servers (json)
    -   created_at
    -   updated_at

    -   when we're gonna get the servers:

        -   check if we have one in the db
        -   if we do, check when it was last updated
        -   if its passed a certain point, then go ahead and refresh the list
        -   if its not passed a certain point, then return from the db

    -   add button to manually refresh the list
        -   this will check if the updated at is passed a certain point
            -   point will be less time than usual, like a throttle period, (5 minutes?)
            -   if its not passed then return an error saying to wait 5 minutes
            -   if it is passed then manually refresh the list again.
