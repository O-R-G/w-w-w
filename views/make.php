<section id="main">
    <div id='content' class='make'>
        <div id='columns'><?

            // output meta records (no begin dates
            foreach($nav as $n) {
                $notes = $n['o']['notes'];
                $date =  $n['o']['begin'];
                if (!$date) {
                    ?><div id='notes' class='mono'><?
                        echo $notes;
                    ?></div><?
                }
            }

            // output regular records (have begin dates)
            foreach($nav as $n) {
                $name = $n['o']['name1'];
                $deck = $n['o']['deck'];
                $notes = $n['o']['notes'];
                $date =  $n['o']['begin'];
                if ($date) {
                    ?><div id='notes' class='mono'><?
                        echo date("F j, Y", strtotime($date));
                        echo '<br/>';
                        echo $deck;
                        echo '<br/><br/>';
                        echo $notes;
                    ?></div><?
                }
            }
        ?></div>
    </div>
</section>
