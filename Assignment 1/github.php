<?php
/**
 * Plugin Name: GitHub
 * Plugin URI: http://fullsail.com
 * Description: Display a list of repos for a specific GitHub user
 * Version: 1.0.0
 * Author: Griffin Yates
 * License: GL2
 */

add_action('widgets_init', 'wpb_load_widget2');

function wpb_load_widget2() {
    register_widget('github_widget');
}

class github_widget extends WP_Widget {
    function __construct() {
        parent:: __construct('github_widget', __('GitHub Widget', 'github_widget'), ['description' => __('Display a list of repos for a specific GitHub user', 'github_widget')]);
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];
        echo $args['before_title'] . 'Repos' . $args['after_title'];
        $response = wp_remote_get('https://api.github.com/users/' . $instance['username'] .'/repos');
        echo $instance['username'];
        $info = json_decode($response["body"],true);
        // var_dump($info[0]["name"]);
        for($i = 0; $i < 10; $i++) {
            echo '<p>' . $info[$i]['name'] . '</p>'; 
        }
        echo $args['after_widget'];
    }

    public function form($instance) {
        $username = isset($instance['username']) ? $instance['username'] : '';
        ?>
        <p>
            <label for="<?= $this->get_field_id('username') ?>">Username:</label>
            <input
            type="text" id="<?= $this->get_field_id('username') ?>" name="<?= $this->get_field_name('username') ?>" value="<?= esc_attr($username) ?>" class="widefat">
        </p>
        <?php
    }
}

?>