"""
This sample demonstrates an implementation of the Lex Code Hook Interface
in order to serve a sample bot which manages orders for flowers.
Bot, Intent, and Slot models which are compatible with this sample can be found in the Lex Console
as part of the 'OrderFlowers' template.

For instructions on how to set up and test this bot, as well as additional samples,
visit the Lex Getting Started documentation http://docs.aws.amazon.com/lex/latest/dg/getting-started.html.
"""
import math
import datetime
import logging

import requests

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


""" --- Helpers to build responses which match the structure of the necessary dialog actions --- """

def get_slots(intent_request):
    return intent_request['currentIntent']['slots']


def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }

def close(session_attributes, fulfillment_state, message):
    print "got here close"
    response = {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }
    print response
    return response

def delegate(session_attributes, slots):
    print "got here delegate"
    
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }


""" --- Helper Functions --- """


def parse_int(n):
    try:
        return int(n)
    except ValueError:
        return float('nan')


def build_validation_result(is_valid, violated_slot, message_content):
    if message_content is None:
        return {
            "isValid": is_valid,
            "violatedSlot": violated_slot,
        }

    return {
        'isValid': is_valid,
        'violatedSlot': violated_slot,
        'message': {'contentType': 'PlainText', 'content': message_content}
    }

'''
def validate_order_flowers(flower_type, date, time):
    flower_types = ['lilies', 'roses', 'tulips']
    if flower_type is not None and flower_type not in flower_types:
        return build_validation_result(False,
                                       'FlowerType',
                                       'We do not have {}, would you like a different type of flower?  '
                                       'Our most popular flowers are roses'.format(flower_type))

    if date is not None:
        if datetime.datetime.strptime(date, '%Y-%m-%d').date() < datetime.date.today():
            return build_validation_result(False, 'PickupDate', 'Your pickup date is in the past!  Can you try a different date?')

    if time is not None:
        if len(time) != 5:
            # Not a valid time; use a prompt defined on the build-time model.
            return build_validation_result(False, 'PickupTime', None)

        hour, minute = time.split(':')
        hour = parse_int(hour)
        minute = parse_int(minute)
        if math.isnan(hour) or math.isnan(minute):
            # Not a valid time; use a prompt defined on the build-time model.
            return build_validation_result(False, 'PickupTime', None)

        if hour < 10 or hour > 16:
            # Outside of business hours
            return build_validation_result(False, 'PickupTime', 'Our business hours are from ten a m. to five p m. Can you specify a time during this range?')

    return build_validation_result(True, None, None)


""" --- Functions that control the bot's behavior --- """
'''

#def order_flowers(intent_request):
def call911(intent_request):
    """
    Performs dialog management and fulfillment for ordering flowers.
    Beyond fulfillment, the implementation of this intent demonstrates the use of the elicitSlot dialog action
    in slot validation and re-prompting.
    """


    #flower_type = get_slots(intent_request)["FlowerType"]
    #date = get_slots(intent_request)["PickupDate"]
    #time = get_slots(intent_request)["PickupTime"]
    source = intent_request['invocationSource']

    print "got here", source


    first_name = get_slots(intent_request)["FirstName"]
    phone = get_slots(intent_request)["Phone"]
    location = get_slots(intent_request)["Location"]
    emergency = get_slots(intent_request)["Emergency"]

    if source == 'DialogCodeHook':
        # Perform basic validation on the supplied input slots.
        # Use the elicitSlot dialog action to re-prompt for the first violation detected.
        slots = get_slots(intent_request)

        '''
        validation_result = validate_order_flowers(flower_type, date, time)
        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])
		'''
        # Pass the price of the flowers back through session attributes to be used in various prompts defined
        # on the bot model.
        output_session_attributes = intent_request['sessionAttributes']
        #if flower_type is not None:
        #    output_session_attributes['Price'] = len(flower_type) * 5  # Elegant pricing model

        #print "got here 2"

        #return delegate(output_session_attributes, get_slots(intent_request))

    # Order the flowers, and rely on the goodbye message of the bot to define the message to the end user.
    # In a real bot, this would likely involve a call to a backend service.
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Thank you {}, you are now being connected with a call-taker'.format(first_name)})


""" --- Functions that control the bot's behavior --- """
def post911request(intent_request):
    
    sampleJSON = {
        "dialogAction": {
            "slots": {
                "FirstName": "Morty",
                "Location": "Rick",
                "Phone": "906-440-9412",
                "Emergency": "Fell in radioactive waste and became superhero"
                },
            "type": ""
        },
        "sessionAttributes": {}
    }
    
    print sampleJSON['dialogAction']['slots']
    
    sampleJSON['dialogAction']['slots'] = intent_request['currentIntent']['slots']
    
    print intent_request['currentIntent']['slots']
    
    cogBotHost = 'https://ec2-54-242-20-44.compute-1.amazonaws.com:3333/api/create-call'
    r = requests.post(cogBotHost, json=sampleJSON, verify=False)
    print "Sent request..."
    print r
    
    return call911(intent_request)
    
""" --- Intents --- """
def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """

    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))

    intent_name = intent_request['currentIntent']['name']

    if intent_name == 'callForHelp':
        return post911request(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')

""" --- Main handler --- """
def lambda_handler(event, context):
    """
    Route the incoming request based on intent.
    The JSON body of the request is provided in the event slot.
    """

    logger.debug('event.bot.name={}'.format(event['bot']['name']))

    return dispatch(event)
