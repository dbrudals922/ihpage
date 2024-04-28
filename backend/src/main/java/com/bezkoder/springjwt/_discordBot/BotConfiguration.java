package com.bezkoder.springjwt._discordBot;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import discord4j.core.DiscordClientBuilder;
import discord4j.core.GatewayDiscordClient;
import discord4j.core.event.domain.Event;
import reactor.core.publisher.Mono;

//@Configuration
public class BotConfiguration {

//	private static final Logger log = LoggerFactory.getLogger(_BotConfiguration.class);
//
//	@Value("${token}")
//	private String token;
//
//	@Bean
//	public <T extends Event> GatewayDiscordClient gatewayDiscordClient(List<_EventListener<T>> eventListeners) {
//		GatewayDiscordClient client = null;
//
//		try {
//			client = DiscordClientBuilder.create(token).build().login().block();
//
//			for (_EventListener<T> listener : eventListeners) {
//				client.on(listener.getEventType()).flatMap(listener::execute).onErrorResume(listener::handleError)
//						.subscribe();
//			}
//
//		} catch (Exception exception) {
//			log.error("Be sure to use a valid bot token!", exception);
//		}
//
//		return client;
//	}
}