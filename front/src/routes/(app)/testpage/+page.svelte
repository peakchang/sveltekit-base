<script>
    import axios from 'axios';

    const testFff = () => {
        console.log('gogogogo');
        axios.post('/testpage',{testval:'alsdjflaisjfd'}).then((res) => {
            console.log(res.data);
        })
    }
</script>


<button on:click={testFff}>lasjfliasjdif</button>
asdfasdfaslkjflaskjdf